import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div className="complete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {/** stateの数だけ繰り返し描画する
            繰り返しでhtmlタグを出力するときは一番外側にあるタグにkeyをつける。作成されたコンポーネントが一意であることを証明するため。
            レンダリング中何番目の繰り返しの要素でイベントが発生したか判断するためにindexを第２引数に指定する。**/}
        {todos.map((todo, index) => {
          return (
            <div key={todo} className="list-row">
              <li>{todo}</li>
              {/* 関数に引数を渡す場合はアロー関数で囲い階層を深くする*/}
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickDelete(index)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
