import React from 'react';

const dummyData = [{ name: "friends", id: "1", isEditMode: false}, { name: "family", id: "2", isEditMode: false}];
let initialData;
const isLocalData = localStorage.getItem('categories');

if (isLocalData !== null) {
  initialData = JSON.parse(isLocalData);
}
else {
  initialData = dummyData;
}

export default function categories(currentData = initialData , action) {
  let newCategories = [...currentData];
  if (action.type === 'UPDATE_CATEGORY_NAME') {
    newCategories.map((item)=>{
      if(item.id === action.id){
        item.name = action.name;
      }
    });
    localStorage.setItem('categories', JSON.stringify(newCategories));
    return newCategories;
  }
  if (action.type === 'UPDATE_CATEGORY_EDITMODE') {
    newCategories.map((item)=>{
      if(item.id === action.id){
        item.isEditMode = action.mode;
      }
    });
    localStorage.setItem('categories', JSON.stringify(newCategories));
    return newCategories;
  }
  if (action.type === 'DELETE_CATEGORY') {
    const index = newCategories.findIndex((item)=> item.id === action.id);
    newCategories.splice(index, 1);
    localStorage.setItem('categories', JSON.stringify(newCategories));
    return newCategories;
  }
  if (action.type === 'ADD_NEW_CATEGORY') {
    newCategories.push(action.newCat);
    localStorage.setItem('categories', JSON.stringify(newCategories));
    return newCategories;
  }
  localStorage.setItem('categories', JSON.stringify(newCategories));
  return newCategories;
}
