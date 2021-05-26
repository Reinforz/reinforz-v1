import React, { useContext, useEffect, useState } from 'react';
import { Table } from "../../../shared";
import { PlayContext } from '../Play';
import "./PlayTable.scss";

function PlayTable() {
  const { filteredQuizzes } = useContext(PlayContext);

  const [difficulty_map, setDifficultyMap] = useState([] as any[]);
  const [type_map, setTypeMap] = useState([] as any[]);
  const [time_allocated_map, setTimeAllocatedMap] = useState([] as any[])

  useEffect(() => {
    setTimeAllocatedMap(filteredQuizzes.map(({ questions, title, _id }) => {
      const time_allocated_map: Record<string, any> = {
        _id,
        title
      };
      questions.forEach(({ time_allocated }) => {
        const time = Math.ceil(time_allocated / 15) * 15;
        if (!time_allocated_map[time]) time_allocated_map[time] = 1;
        else time_allocated_map[time]++;
      })
      return time_allocated_map;
    }));

    setTypeMap(filteredQuizzes.map(({ questions, title, _id }) => {
      const type_map: Record<string, any> = {
        Snippet: 0,
        MS: 0,
        FIB: 0,
        MCQ: 0,
        _id,
        title
      };
      questions.forEach(({ type }) => {
        type_map[type]++;
      })
      return type_map;
    }))

    setDifficultyMap(filteredQuizzes.map(({ questions, title, _id }) => {
      const difficulty_map: Record<string, any> = {
        Beginner: 0,
        Intermediate: 0,
        Advanced: 0,
        _id,
        title
      };
      questions.forEach(({ difficulty }) => {
        difficulty_map[difficulty]++;
      })
      return difficulty_map;
    }))
  }, [filteredQuizzes])

  return (
    <div className="PlayTable">
      <Table className="PlayTable--difficulty" title={"QuestionDifficulty based Table"} accumulator={(header, contents) => {
        switch (header) {
          case "Beginner":
          case "Intermediate":
          case "Advanced":
            return contents?.reduce((acc: number, cur: number) => acc + cur, 0);
          default:
            return null
        }
      }} contents={difficulty_map} headers={['title', "Beginner", "Intermediate", "Advanced"]} onHeaderClick={(header, order) => {
        setDifficultyMap([...difficulty_map.sort((a_diff, b_diff) => order === "DESC" ? (parseInt(b_diff[header]) - parseInt(a_diff[header])) : (parseInt(a_diff[header]) - parseInt(b_diff[header])))])
      }} />
      <Table className="PlayTable--type" title={"Type based Table"} accumulator={(header, contents) => {
        switch (header) {
          case "Snippet":
          case "MS":
          case "FIB":
          case "MCQ":
            return contents?.reduce((acc: number, cur: number) => acc + cur, 0);
          default:
            return null
        }
      }} contents={type_map} headers={['title', "Snippet", "MS", "MCQ", "FIB"]} onHeaderClick={(header, order) => {
        setTypeMap([...type_map.sort((a_diff, b_diff) => order === "DESC" ? (parseInt(b_diff[header]) - parseInt(a_diff[header])) : (parseInt(a_diff[header]) - parseInt(b_diff[header])))])
      }} />
      <Table className="PlayTable--time_allocated" title={"Time based Table"} accumulator={(header, contents) => {
        if (header.match(/(title|_id)/)) return null;
        else return contents?.reduce((acc: number, cur: number) => acc + (cur ?? 0), 0);
      }} contents={time_allocated_map} headers={['title', "15", "30", "45", "60"]} onHeaderClick={(header, order) => {
        setTimeAllocatedMap([...time_allocated_map.sort((a_diff, b_diff) => order === "DESC" ? (parseInt(b_diff[header]) - parseInt(a_diff[header])) : (parseInt(a_diff[header]) - parseInt(b_diff[header])))])
      }} />
    </div>
  );
}

export default PlayTable;