import React from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../supabase";

async function getSum() {
  const { data, error } = await supabase.from("sum").select("money");

  if (error) {
    console.error("Error:", error);
    return;
  }

  const sum = data.reduce((acc, item) => acc + item.money);
  console.log("Sum:", sum);
}

getSum();

const Array1 = [1, 2, 3, 4, 5];
const result1 = Array1.reduce((acc, cur) => acc + cur);
console.log(result1);

const Result = () => {
  return <div>Result</div>;
};

export default Result;
