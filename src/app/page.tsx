"use client";

import Cart from "@/components/Cart";
import data from "./data.json";
import { useState } from "react";
import { cartData } from "@/app/type";
import Item from "@/components/Item";

type ItemType = { [key: string]: any };

export default function Home() {
  const [list, setList] = useState<Array<cartData>>([]);

  function addItem(name: string, price: number, imageThumbnail: string) {
    let found = false;
    const newList = list.map((item) => {
      if (item.name === name) {
        const newQuantity = (item.quantity || 0) + 1;
        found = true;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    if (found) setList(newList);
    else setList([...list, { name, price, imageThumbnail, quantity: 1 }]);
  }

  function decreaseItem(itemIndex: number) {
    let found = true;
    const newList = list.map((item, id) => {
      if (id === itemIndex) {
        const newQuantity = (item.quantity || 1) - 1;
        if (newQuantity <= 0) found = false;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    if (found) setList(newList);
    else setList(list.filter((item, id) => id !== itemIndex));
  }

  function removeItem(index: number) {
    const newList = list.filter((item, id) => id !== index);
    setList(newList);
  }

  return (
    <main className="bg-Rose-50 p-5">
      <section className="md:flex max-w-[1220px] mx-auto md:gap-4 xl:gap-[30px]">
        <div>
          <h1 className="text-4xl text-Rose-900 leading-loose font-bold">
            Desserts
          </h1>
          <div className="lg:grid lg:grid-cols-2 gap-6 xl:grid-cols-3">
            {data.map((item: ItemType) => (
              <Item
                key={item.name}
                name={item.name}
                category={item.category}
                price={item.price}
                imageDesk={item.image.desktop}
                imageMobile={item.image.mobile}
                imageTab={item.image.tablet}
                imageThumbnail={item.image.thumbnail}
                addItem={addItem}
                decreaseItem={decreaseItem}
                list={{ list: list, removeItem: removeItem, setList: setList }}
              />
            ))}
          </div>
        </div>
        <Cart list={list} removeItem={removeItem} setList={setList} />
      </section>
    </main>
  );
}
