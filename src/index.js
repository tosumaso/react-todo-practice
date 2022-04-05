import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

/**
 * React18のレンダリング方法
 * 1: import { createRoot } from 'react-dom/client';
 * 2: createRoot(レンダリング対象の要素).render(レンダリングするファイル);
 */

const root = createRoot(document.getElementById("root"));
root.render(<App />);
