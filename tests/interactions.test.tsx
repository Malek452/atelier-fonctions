import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import App from '../src/App';
import { getActivity } from '../src/content';
beforeEach(() => {
  window.location.hash = '#accueil';
});
it('opens directly on the presentation without a landing page or promotional content', () => {
  const { container } = render(<App />);
  assert.ok(screen.getByRole('heading', { name: 'Lire l’énoncé' }));
  assert.equal(
    (screen.getByRole('combobox', { name: 'Choisir un exercice' }) as HTMLSelectElement).options
      .length,
    12,
  );
  assert.equal(container.querySelector('.hero,.sidebar,.home-footer'), null);
  assert.equal(screen.queryByRole('button', { name: /Ouvrir le corrigé/ }), null);
  assert.equal(screen.queryByRole('textbox'), null);
});
it('opens corrections immediately and allows any step without an answer', () => {
  window.location.hash = '#exercice-5-5';
  render(<App />);
  const a = getActivity('5q5')!;
  assert.equal(screen.queryByRole('textbox'), null);
  assert.equal(screen.queryByText('Vérifier ma réponse'), null);
  assert.ok(screen.getByRole('heading', { name: a.steps[0].title }));
  fireEvent.change(screen.getByRole('combobox', { name: 'Aller à une étape' }), {
    target: { value: String(a.steps.length - 1) },
  });
  assert.ok(screen.getByRole('heading', { name: a.steps.at(-1)!.title }));
  assert.equal(
    (screen.getByRole('button', { name: 'Étape suivante' }) as HTMLButtonElement).disabled,
    true,
  );
  fireEvent.click(screen.getByRole('button', { name: 'Étape précédente' }));
  assert.ok(screen.getByRole('heading', { name: a.steps.at(-2)!.title }));
});
it('keeps the explanation aligned with the selected calculation when jumping and going back', () => {
  window.location.hash = '#exercice-2-4';
  const { container } = render(<App />);
  const activity = getActivity('2q4')!;
  const i = activity.steps.findIndex((s) => s.title === 'Calculer x × (−1)');
  fireEvent.change(screen.getByRole('combobox', { name: 'Aller à une étape' }), {
    target: { value: String(i) },
  });
  assert.equal(
    container.querySelector('.reading-explanation p')!.textContent,
    activity.steps[i].why,
  );
  assert.ok(screen.getByRole('heading', { name: 'Calculer x × (−1)' }));
  fireEvent.keyDown(document.body, { key: 'ArrowLeft' });
  assert.equal(
    container.querySelector('.reading-explanation p')!.textContent,
    activity.steps[i - 1].why,
  );
  assert.ok(screen.getByRole('heading', { name: 'Calculer x × (4/x)' }));
});
it('builds a French sign table row by row and distinguishes a forbidden value from a zero', () => {
  window.location.hash = '#exercice-3-2';
  const { container } = render(<App />),
    activity = getActivity('3q2')!;
  const first = activity.steps.findIndex((s) => s.table);
  const go = (i: number) =>
    fireEvent.change(screen.getByRole('combobox', { name: 'Aller à une étape' }), {
      target: { value: String(i) },
    });
  go(first);
  const table = screen.getByRole('table');
  assert.equal(table.querySelectorAll('tbody tr').length, 3);
  assert.equal(table.querySelectorAll('thead th').length, 6);
  assert.equal(table.querySelectorAll('tbody td .math').length, 0);
  go(first + 1);
  assert.equal(container.querySelectorAll('tbody td .math').length, 2);
  go(first + 3);
  assert.ok(screen.getByRole('img', { name: 'valeur interdite' }));
  assert.equal(
    container.querySelector('.reading-explanation p')!.textContent,
    activity.steps[first + 3].why,
  );
  go(first + 4);
  assert.equal(container.querySelectorAll('.sign-selected').length, 1);
  assert.equal(container.querySelectorAll('.sign-selected .sign-forbidden').length, 0);
  assert.equal(container.querySelectorAll('.animation-fallback').length, 0);
  const region = screen.getByRole('region', {
    name: 'Tableau de signes, défilement horizontal si nécessaire',
  });
  Object.defineProperty(region, 'scrollWidth', { value: 900 });
  Object.defineProperty(region, 'clientWidth', { value: 350 });
  fireEvent.keyDown(region, { key: 'ArrowRight' });
  assert.equal(
    (screen.getByRole('combobox', { name: 'Aller à une étape' }) as HTMLSelectElement).value,
    String(first + 4),
  );
  go(first + 2);
  assert.equal(screen.queryByRole('img', { name: 'valeur interdite' }), null);
});
it('supports keyboard steps and playback pause/replay controls', () => {
  window.location.hash = '#exercice-1-7';
  render(<App />);
  const a = getActivity('1q7')!;
  fireEvent.keyDown(document.body, { key: 'ArrowRight' });
  assert.ok(screen.getByRole('heading', { name: a.steps[1].title }));
  fireEvent.keyDown(document.body, { key: 'ArrowLeft' });
  assert.ok(screen.getByRole('heading', { name: a.steps[0].title }));
  fireEvent.click(screen.getByRole('button', { name: 'Lecture' }));
  assert.ok(screen.getByRole('button', { name: 'Pause' }));
  fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
  fireEvent.click(screen.getByRole('button', { name: 'Rejouer cette étape' }));
  assert.ok(screen.getByRole('button', { name: 'Lecture' }));
});
it('gives the longer mathematical animation time to finish before automatic advance', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  window.location.hash = '#exercice-1-1';
  render(<App />);
  fireEvent.change(screen.getByRole('combobox', { name: 'Aller à une étape' }), {
    target: { value: '2' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Lecture' }));
  act(() => t.mock.timers.tick(9999));
  assert.ok(screen.getByRole('heading', { name: 'Additionner les exposants' }));
  act(() => t.mock.timers.tick(1));
  assert.ok(screen.getByRole('heading', { name: 'Calculer la somme' }));
});
it('navigates questions by deep link and keeps motion preference', async () => {
  window.location.hash = '#exercice-1-7';
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Question suivante' }));
  await screen.findAllByText('Question 8');
  fireEvent.click(screen.getByRole('button', { name: 'Question précédente' }));
  await screen.findAllByText('Question 7');
  assert.equal(localStorage.getItem('atelier:motion'), 'reduced');
});

it('keeps exactly one visible mathematical surface and no side outline', () => {
  window.location.hash = '#exercice-2-6';
  const { container } = render(<App />);
  assert.equal(container.querySelectorAll('.reading-board').length, 1);
  assert.equal(container.querySelectorAll('.reading-board .katex-display').length, 1);
  assert.equal(container.querySelector('.step-outline'), null);
  assert.equal(container.querySelector('.justification'), null);
  assert.equal(container.querySelector('.statement'), null);
  assert.ok(container.querySelector('.presentation'));
  fireEvent.change(screen.getByRole('combobox', { name: 'Aller à une étape' }), {
    target: { value: '4' },
  });
  assert.equal(container.querySelectorAll('.reading-board .katex-display').length, 1);
});

it('navigates between exercises and questions, including exercise boundaries', async () => {
  window.location.hash = '#exercice-1-8';
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Question suivante' }));
  await screen.findByRole('option', { name: 'Domaine de f1' });
  assert.equal(
    (screen.getByRole('combobox', { name: 'Choisir un exercice' }) as HTMLSelectElement).value,
    '2',
  );
  fireEvent.click(screen.getByRole('button', { name: 'Question précédente' }));
  await screen.findByRole('option', { name: 'Question 8' });
  assert.equal(
    (screen.getByRole('combobox', { name: 'Choisir une question' }) as HTMLSelectElement).value,
    '7',
  );
  fireEvent.change(screen.getByRole('combobox', { name: 'Choisir un exercice' }), {
    target: { value: '12' },
  });
  await waitFor(() =>
    assert.equal(
      (screen.getByRole('combobox', { name: 'Choisir un exercice' }) as HTMLSelectElement).value,
      '12',
    ),
  );
  assert.equal(
    (screen.getByRole('button', { name: 'Question suivante' }) as HTMLButtonElement).disabled,
    true,
  );
});
const finger = (x: number, y = 180, id = 1) => ({ identifier: id, clientX: x, clientY: y });
const drag = (
  target: Element,
  start: ReturnType<typeof finger>,
  end: ReturnType<typeof finger>,
) => {
  fireEvent.touchStart(target, { touches: [start], changedTouches: [start] });
  fireEvent.touchMove(target, { touches: [end], changedTouches: [end] });
  fireEvent.touchEnd(target, { touches: [], changedTouches: [end] });
};
it('swipes left to the next step and right to the previous step, and pauses playback', () => {
  window.location.hash = '#exercice-1-7';
  const { container } = render(<App />);
  const surface = container.querySelector('.slide-surface')!;
  const a = getActivity('1q7')!;
  fireEvent.click(screen.getByRole('button', { name: 'Lecture' }));
  drag(surface, finger(330), finger(180));
  assert.ok(screen.getByRole('heading', { name: a.steps[1].title }));
  assert.ok(screen.getByRole('button', { name: 'Lecture' }));
  drag(surface, finger(180), finger(330));
  assert.ok(screen.getByRole('heading', { name: a.steps[0].title }));
});
it('ignores vertical, short, diagonal, edge, and multitouch gestures', () => {
  const { container } = render(<App />);
  const surface = container.querySelector('.slide-surface')!;
  drag(surface, finger(300, 100), finger(310, 310));
  drag(surface, finger(300), finger(280));
  drag(surface, finger(330, 100), finger(180, 250));
  drag(surface, finger(5), finger(160));
  fireEvent.touchStart(surface, { touches: [finger(300), finger(400, 180, 2)] });
  fireEvent.touchEnd(surface, { touches: [], changedTouches: [finger(120)] });
  assert.ok(screen.getByRole('heading', { name: 'Lire l’énoncé' }));
});
it('cancels interrupted gestures and never moves past the correction boundaries', () => {
  const { container } = render(<App />);
  const surface = container.querySelector('.slide-surface')!;
  const a = getActivity('1q1')!;
  drag(surface, finger(180), finger(330));
  assert.ok(screen.getByRole('heading', { name: a.steps[0].title }));
  fireEvent.touchStart(surface, { touches: [finger(330)] });
  fireEvent.touchCancel(surface);
  fireEvent.touchEnd(surface, { touches: [], changedTouches: [finger(180)] });
  assert.ok(screen.getByRole('heading', { name: a.steps[0].title }));
  fireEvent.change(screen.getByRole('combobox', { name: 'Aller à une étape' }), {
    target: { value: String(a.steps.length - 1) },
  });
  drag(surface, finger(330), finger(180));
  assert.ok(screen.getByRole('heading', { name: a.steps.at(-1)!.title }));
});
it('preserves horizontal scrolling of an overflowing formula', () => {
  const { container } = render(<App />);
  const math = container.querySelector('.katex-display') as HTMLElement;
  math.style.overflowX = 'auto';
  Object.defineProperty(math, 'scrollWidth', { value: 600 });
  Object.defineProperty(math, 'clientWidth', { value: 280 });
  drag(math, finger(330), finger(180));
  assert.ok(screen.getByRole('heading', { name: 'Lire l’énoncé' }));
});
it('enters fullscreen only on request and reflects exiting fullscreen', async () => {
  let current: Element | null = null;
  const mainRequest = Object.getOwnPropertyDescriptor(
    window.HTMLElement.prototype,
    'requestFullscreen',
  );
  const exit = Object.getOwnPropertyDescriptor(document, 'exitFullscreen');
  const element = Object.getOwnPropertyDescriptor(document, 'fullscreenElement');
  Object.defineProperty(window.HTMLElement.prototype, 'requestFullscreen', {
    configurable: true,
    value: async function (this: HTMLElement) {
      current = this;
      document.dispatchEvent(new window.Event('fullscreenchange'));
    },
  });
  Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => current });
  Object.defineProperty(document, 'exitFullscreen', {
    configurable: true,
    value: async () => {
      current = null;
      document.dispatchEvent(new window.Event('fullscreenchange'));
    },
  });
  try {
    render(<App />);
    assert.equal(current, null);
    fireEvent.click(screen.getByRole('button', { name: 'Plein écran' }));
    await screen.findByRole('button', { name: 'Quitter le plein écran' });
    assert.ok(current);
    fireEvent.click(screen.getByRole('button', { name: 'Quitter le plein écran' }));
    await screen.findByRole('button', { name: 'Plein écran' });
    assert.equal(current, null);
  } finally {
    for (const [object, key, descriptor] of [
      [window.HTMLElement.prototype, 'requestFullscreen', mainRequest],
      [document, 'exitFullscreen', exit],
      [document, 'fullscreenElement', element],
    ] as const) {
      if (descriptor) Object.defineProperty(object, key, descriptor);
      else Reflect.deleteProperty(object, key);
    }
  }
});
