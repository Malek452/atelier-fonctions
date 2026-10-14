import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize, Waves } from 'lucide-react';
import { exercises } from './content';
import { Lesson } from './components/Lesson';
function readRoute() {
  const m = window.location.hash.match(/^#exercice-(\d+)(?:-(\d+))?$/);
  const exercise = exercises.find((e) => e.id === Number(m?.[1])) || exercises[0];
  return {
    exercise: exercise.id,
    index: Math.max(0, Math.min(exercise.activities.length - 1, Number(m?.[2] || 1) - 1)),
  };
}
export default function App() {
  const [route, setRoute] = useState(readRoute),
    [full, setFull] = useState(false),
    [fullError, setFullError] = useState('');
  const [reduced, setReduced] = useState(() => {
    try {
      const saved = localStorage.getItem('atelier:motion');
      return saved
        ? saved === 'reduced'
        : !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    }
  });
  const shell = useRef<HTMLElement>(null),
    surface = useRef<HTMLDivElement>(null);
  const exerciseIndex = exercises.findIndex((e) => e.id === route.exercise),
    exercise = exercises[exerciseIndex],
    activity = exercise.activities[route.index];
  const isFirst = exerciseIndex === 0 && route.index === 0,
    isLast =
      exerciseIndex === exercises.length - 1 && route.index === exercise.activities.length - 1;
  useEffect(() => {
    const change = () => {
      setRoute(readRoute());
      surface.current?.focus({ preventScroll: true });
    };
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
    try {
      localStorage.setItem('atelier:motion', reduced ? 'reduced' : 'full');
    } catch {
      /* The reader also works with storage disabled. */
    }
  }, [reduced]);
  useEffect(() => {
    const sync = () => setFull(document.fullscreenElement === shell.current);
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);
  const navigate = (id: number, index = 0) => {
    window.location.hash = `exercice-${id}-${index + 1}`;
  };
  const adjacent = (direction: -1 | 1) => {
    const next = route.index + direction;
    if (next >= 0 && next < exercise.activities.length) navigate(exercise.id, next);
    else {
      const ex = exercises[exerciseIndex + direction];
      if (ex) navigate(ex.id, direction === 1 ? 0 : ex.activities.length - 1);
    }
  };
  const toggleFull = async () => {
    setFullError('');
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await shell.current?.requestFullscreen();
    } catch {
      setFullError(
        'Le navigateur n’a pas autorisé le plein écran. La présentation reste disponible.',
      );
    }
  };
  return (
    <main className="presentation" ref={shell}>
      <a
        className="skip-link"
        href="#presentation"
        onClick={(e) => {
          e.preventDefault();
          surface.current?.focus();
        }}
      >
        Aller à la présentation
      </a>
      <nav className="presentation-nav" aria-label="Navigation du TD">
        <label className="exercise-select">
          <span>Exercice</span>
          <select
            aria-label="Choisir un exercice"
            value={exercise.id}
            onChange={(e) => navigate(+e.target.value)}
          >
            {exercises.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {String(ex.id).padStart(2, '0')} · {ex.short}
              </option>
            ))}
          </select>
        </label>
        <div className="question-select">
          <button
            className="icon-button"
            aria-label="Question précédente"
            title="Question précédente"
            disabled={isFirst}
            onClick={() => adjacent(-1)}
          >
            <ChevronLeft size={20} />
          </button>
          <label>
            <span>Sous-question</span>
            <select
              aria-label="Choisir une question"
              value={route.index}
              onChange={(e) => navigate(exercise.id, +e.target.value)}
            >
              {exercise.activities.map((a, i) => (
                <option key={a.id} value={i}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>
          <button
            className="icon-button"
            aria-label="Question suivante"
            title="Question suivante"
            disabled={isLast}
            onClick={() => adjacent(1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="display-options">
          <button
            className="icon-button"
            aria-label={reduced ? 'Activer les animations' : 'Réduire les animations'}
            title={reduced ? 'Activer les animations' : 'Réduire les animations'}
            aria-pressed={!reduced}
            onClick={() => setReduced(!reduced)}
          >
            <Waves size={19} />
          </button>
          {typeof document.documentElement.requestFullscreen === 'function' && (
            <button
              className="icon-button"
              aria-label={full ? 'Quitter le plein écran' : 'Plein écran'}
              title={full ? 'Quitter le plein écran' : 'Plein écran'}
              aria-pressed={full}
              onClick={toggleFull}
            >
              {full ? <Minimize size={19} /> : <Maximize size={19} />}
            </button>
          )}
        </div>
      </nav>
      {fullError && (
        <p className="display-error" role="status">
          {fullError}
        </p>
      )}
      <div id="presentation" className="presentation-content" tabIndex={-1} ref={surface}>
        <Lesson key={activity.id} activity={activity} reduced={reduced} />
      </div>
    </main>
  );
}
