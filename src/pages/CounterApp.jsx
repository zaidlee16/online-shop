import React from "react";
import { useCounter } from "../utils/store/useCounter";

const CounterApp = () => {
  const { count, username } = useCounter();
  return (
    <>
      <h2>Counter App - {username}</h2>
      <ButtonKurang />
      <p>{count}</p>
      <ButtonTambah />
    </>
  );
};

const ButtonKurang = () => {
  const { btnKurang } = useCounter();
  return <button onClick={btnKurang}>Kurang</button>;
};

const ButtonTambah = () => {
  const { btnTambah } = useCounter();
  return <button onClick={btnTambah}>Tambah</button>;
};

export default CounterApp;
