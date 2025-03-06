import { useState, useContext } from "react";
import { DiaryContext } from "../App";

import Button from "../components/Button"
import Header from "../components/Header"
import DiaryList from "../components/DiaryList";


const getMonthlyData = (pivotDate, data) => {
  const diaryArray = Array.isArray(data) ? data : data.data; // ✅ data.data 사용
  if (!Array.isArray(diaryArray)) {
    console.error("getMonthlyData error: diaryArray is not an array", diaryArray);
    return [];
  }

  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return diaryArray.filter((item) => 
    beginTime <= item.createdData && item.createdData <= endTime
  );
};


export default function Home()  {
  const data = useContext(DiaryContext);
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header 
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={'<'} />}
        rightChild={<Button onClick={onIncreaseMonth} text={'>'} />}
      />
      <DiaryList data={monthlyData}/>
    </div>
  );
};
