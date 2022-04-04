import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  //未完了、完了の表示テキストをstateで持つ
  const [incompleteTodos, setIncompleteTodos] = useState([
    "ああああ",
    "いいいい"
  ]);
  const [completeTodos, setCompleteTodos] = useState(["うううう"]);
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

  return (
    <>
      <div className="input-area">
        {/* テキストが入力されるたびにonChangeでイベントが発生し、stateに変更が保存される。*/}
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangetodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="complete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {/** stateの数だけ繰り返し描画する
            繰り返しでhtmlタグを出力するときは一番外側にあるタグにkeyをつける。作成されたコンポーネントが一意であることを証明するため。
            レンダリング中何番目の繰り返しの要素でイベントが発生したか判断するためにindexを第２引数に指定する。**/}
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>完了</button>
                {/* 関数に引数を渡す場合はアロー関数で囲い階層を深くする*/}
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="incomplete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
