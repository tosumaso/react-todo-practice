import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  //未完了、完了の表示テキストをstateで持つ
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  //テキストボックスで入力した値を取り出して使うためにstateを持つ
  const [todoText, setTodoText] = useState("");

  const onChangetodoText = (event) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = () => {
    //空文字で追加させない
    if (todoText === "") return;
    //スプレッド構文の配列のコピー + 入力された文字で新しい未完了TODOを作成
    //stateを関数で変更して再レンダリング後、mapで繰り返し描画される。
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    //追加ボタン押した後inputを空にする。
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    //配列.splice(index,num) : 配列のindex番目からnum個を削除する
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      {/*テキストボックスと追加ボタン、未完了のTODO、完了のTODOを３つをコンポーネントにわける
         親コンポーネントで定義した関数やstateを使えるように、子コンポーネントの呼び出し時にpropsで渡す */}
      <InputTodo
        todoText={todoText}
        onChange={onChangetodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTODOは５個までです。</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
