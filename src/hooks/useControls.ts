import { useRef, useEffect, useState } from "react";

// Shared keyboard state for the vehicle fleet.
// Both the vehicle component and mobile controls read/write this,
// so button presses and keyboard presses stay in sync.

export interface InputState {
  w: boolean;
  s: boolean;
  a: boolean;
  d: boolean;
  space: boolean; // brake
  e: boolean; // interact
  shift: boolean; // speed up / alternate
  esc: boolean; // close panels
}

export function useControls() {
  const state = useRef<InputState>({
    w: false,
    s: false,
    a: false,
    d: false,
    space: false,
    e: false,
    shift: false,
    esc: false,
  });

  // Keyboard binding via real keydown/keyup events
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onDown = (e: KeyboardEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const k = (e as any).key;
      if (k === "w" || k === "W" || k === "ArrowUp") state.current.w = true;
      if (k === "s" || k === "S" || k === "ArrowDown") state.current.s = true;
      if (k === "a" || k === "A" || k === "ArrowLeft") state.current.a = true;
      if (k === "d" || k === "D" || k === "ArrowRight") state.current.d = true;
      if (k === " ") state.current.space = true;
      if (k === "e" || k === "E") state.current.e = true;
      if (k === "Shift") state.current.shift = true;
      if (k === "Escape") state.current.esc = true;
      // prevent default scrolling for arrows/space
      if (k === "ArrowUp" || k === "ArrowDown" || k === "ArrowLeft" || k === "ArrowRight" || k === " ") {
        e.preventDefault();
      }
    };
    const onUp = (e: KeyboardEvent) => {
      const k = (e as any).key;
      if (k === "w" || k === "W" || k === "ArrowUp") state.current.w = false;
      if (k === "s" || k === "S" || k === "ArrowDown") state.current.s = false;
      if (k === "a" || k === "A" || k === "ArrowLeft") state.current.a = false;
      if (k === "d" || k === "D" || k === "ArrowRight") state.current.d = false;
      if (k === " ") state.current.space = false;
      if (k === "e" || k === "E") state.current.e = false;
      if (k === "Shift") state.current.shift = false;
      if (k === "Escape") state.current.esc = false;
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  return state;
}
