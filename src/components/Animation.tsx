import { useEffect, useRef, useState } from 'react';
import type { Activity } from '../types';
import type { Controller } from '../../motion/player';
import { MathView } from './Math';
import { highlightedTex } from './focus';
import { SignTable } from './SignTable';
export function Animation({
  activity,
  step,
  reduced,
  replay,
  speed,
  pauseSignal,
  onAvailable,
}: {
  activity: Activity;
  step: number;
  reduced: boolean;
  replay: number;
  speed: number;
  pauseSignal: number;
  onAvailable: (available: boolean) => void;
}) {
  const host = useRef<HTMLDivElement>(null),
    controller = useRef<Controller | null>(null),
    current = useRef(step),
    pendingReplay = useRef(false),
    liveSpeed = useRef(speed);
  liveSpeed.current = speed;
  current.current = step;
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const table = activity.steps[step].table;
  useEffect(() => {
    onAvailable(!!table || reduced || state !== 'loading');
  }, [table, reduced, state, onAvailable]);
  useEffect(() => {
    let cancelled = false;
    setState('loading');
    if (reduced) return;
    const url = new URL('animations/player.js', document.baseURI).href;
    import(/* @vite-ignore */ url)
      .then(({ mount }) => {
        if (cancelled || !host.current) return;
        controller.current = mount(
          host.current,
          activity,
          () => {
            if (cancelled) return;
            setState('ready');
            if (pendingReplay.current)
              controller.current?.replay(current.current, liveSpeed.current);
            else controller.current?.seek(current.current);
          },
          () => {
            if (!cancelled) setState('error');
          },
        );
      })
      .catch(() => {
        if (!cancelled) setState('error');
      });
    return () => {
      cancelled = true;
      controller.current?.destroy();
      controller.current = null;
    };
  }, [activity, reduced]);
  useEffect(() => {
    if (table) controller.current?.pause();
    else controller.current?.seek(step);
  }, [step, table]);
  useEffect(() => {
    pendingReplay.current = false;
    controller.current?.pause();
  }, [pauseSignal]);
  useEffect(() => {
    if (replay > 0 && !reduced && !table) {
      pendingReplay.current = true;
      controller.current?.replay(current.current, speed);
    }
  }, [replay, reduced, speed, table]);
  return (
    <div
      className={'animation' + (table ? ' has-table' : '')}
      aria-label="Espace de visualisation mathématique"
    >
      {!reduced && (
        <div
          hidden={!!table}
          ref={host}
          className={'canvas-host ' + (state === 'ready' ? 'is-ready' : '')}
        />
      )}
      {table && (
        <SignTable
          key={`${step}-${replay}`}
          frame={table}
          reduced={reduced}
          speed={speed}
          pauseSignal={pauseSignal}
        />
      )}
      {!table && (reduced || state !== 'ready') && (
        <div className="animation-fallback">
          <MathView display tex={highlightedTex(activity.steps[step])} />
          <p>
            {state === 'error'
              ? 'L’animation n’a pas pu se charger. La formule et son explication restent accessibles.'
              : reduced
                ? ''
                : 'Chargement de l’animation…'}
          </p>
        </div>
      )}
      {!table && state === 'ready' && !reduced && (
        <div className="sr-only">
          <MathView display tex={activity.steps[step].tex} />
        </div>
      )}
    </div>
  );
}
