import { Node, Path, Line } from '@motion-canvas/2d';
import { all, Color, easeInOutCubic, tween } from '@motion-canvas/core';
import type { ThreadGenerator } from '@motion-canvas/core';
import type { Pose } from './geometry';
import { arcPoint, bounds, center, GOLD, INK, contextPairs } from './geometry';

/** Each mathematical glyph has its own persistent position and outline. */
export class EquationLayer {
  readonly root = new Node({});
  readonly underline = new Line({
    points: [
      [0, 0],
      [1, 0],
    ],
    stroke: GOLD,
    lineWidth: 2,
    end: 0,
  });
  private nodes: Path[] = [];
  poses: Pose[] = [];
  constructor(private readonly outlines: Record<string, string>) {
    this.root.add(this.underline);
  }
  private create(p: Pose) {
    const node = new Path({
      data: this.outlines[p.path],
      position: [p.x, p.y],
      scale: [p.sx, p.sy],
      fill: p.color,
    });
    this.root.add(node);
    return node;
  }
  show(poses: Pose[]) {
    this.nodes.forEach((n) => n.remove());
    this.poses = poses;
    this.nodes = poses.map((p) => this.create(p));
    this.underline.end(0);
  }
  remove() {
    this.root.remove();
  }
  *tint(tag: string, color: string, duration: number): ThreadGenerator {
    yield* all(
      ...this.nodes.flatMap((node, i) =>
        this.poses[i].tags.includes(tag) ? [node.fill(color, duration)] : [],
      ),
    );
    this.poses = this.poses.map((p) => (p.tags.includes(tag) ? { ...p, color } : p));
  }
  *emphasize(duration = 0.5, tag = 'focus', color = GOLD): ThreadGenerator {
    const selected = this.poses.filter((g) => g.tags.includes(tag));
    if (!selected.length) return;
    const b = bounds(selected);
    this.underline.points([
      [b[0] - 2, b[3] + 7],
      [b[2] + 2, b[3] + 7],
    ]);
    this.underline.stroke(color);
    this.underline.end(0);
    yield* this.underline.end(1, duration);
  }
  *to(target: Pose[], duration: number, lift = 22, collapseAt?: [number, number]): ThreadGenerator {
    const source = this.poses,
      pairs = contextPairs(source, target);
    const usedFrom = new Set(pairs.map((p) => p[0])),
      usedTo = new Set(pairs.map((p) => p[1]));
    const removed = source.map((_, i) => i).filter((i) => !usedFrom.has(i));
    const inserted = target.map((_, i) => i).filter((i) => !usedTo.has(i));
    const destination =
      collapseAt ||
      center(inserted.map((i) => target[i]).length ? inserted.map((i) => target[i]) : target);
    const tracks: { node: Path; from: Pose; to: Pose; arc: number }[] = [];
    this.underline.end(0);
    for (const [i, j] of pairs)
      tracks.push({
        node: this.nodes[i],
        from: source[i],
        to: target[j],
        arc:
          Math.abs(source[i].x - target[j].x) > 18 || Math.abs(source[i].y - target[j].y) > 8
            ? lift
            : 0,
      });
    // No outline morph: a minus sign must never visually become a number or x.
    // Non-retained syntax is replaced together halfway through the movement.
    const outgoing = removed.map((i) => this.nodes[i]);
    const incoming = inserted.map((j) => {
      const node = this.create(target[j]);
      node.opacity(0);
      return node;
    });
    if (collapseAt)
      for (const i of removed) {
        const p = source[i];
        tracks.push({
          node: this.nodes[i],
          from: p,
          to: { ...p, x: destination[0], y: destination[1], sx: p.sx * 0.001, sy: p.sy * 0.001 },
          arc: lift,
        });
      }
    yield* tween(duration, (value) => {
      const t = easeInOutCubic(value);
      if (!collapseAt) outgoing.forEach((n) => n.opacity(value < 0.5 ? 1 : 0));
      incoming.forEach((n) => n.opacity(value < 0.5 ? 0 : 1));
      for (const { node, from, to, arc } of tracks) {
        node.position(arcPoint([from.x, from.y], [to.x, to.y], t, arc));
        node.scale([from.sx + (to.sx - from.sx) * t, from.sy + (to.sy - from.sy) * t]);
        node.fill(Color.lerp(from.color, to.color, t));
      }
    });
    incoming.forEach((n) => n.remove());
    this.show(target);
  }

  /** A local substitution/calculation: point to the operands, then replace the
   * expression as a unit. Movement is reserved for explicitly identified terms. */
  *rewrite(target: Pose[], duration = 1.65): ThreadGenerator {
    const pairs = contextPairs(this.poses, target);
    const retained = new Set(pairs.map(([i]) => i));
    const changed = this.poses.map((p, i) => ({
      ...p,
      color: retained.has(i) ? INK : GOLD,
      tags: retained.has(i) ? [] : ['replacement'],
    }));
    if (changed.some((p) => p.tags.length)) {
      this.show(changed);
      yield* this.emphasize(duration * 0.4, 'replacement');
    } else {
      yield* this.emphasize(duration * 0.4);
    }
    // An atomic rewrite avoids ever displaying a half-old, half-new equality.
    this.show(target);
    yield* this.emphasize(duration * 0.6);
  }
}
