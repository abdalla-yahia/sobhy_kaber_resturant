import Meal_Details_Container from "@/Components/Meals/Meal_Details_Container";
import React from "react";

export default async function Meal_Details_Page({params}:{params:Promise<{slug:string}>}):Promise<React.ReactNode> {
  const {slug} = await params
    return (
    <Meal_Details_Container slug={slug} />
  )
}
