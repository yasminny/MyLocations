import React from 'react';

const dummyData = [{
  id: '1111',
  name: 'home',
  address: 'tel aviv, israel',
  LatLng: '333, 333',
  relatedCat: [1],
  isEditMode: false
}, {
  id: '2222',
  name: 'brother',
  address: 'tel aviv, israel',
  LatLng: '333, 333',
  relatedCat: [2],
  isEditMode: false
}];

let initialData;

const isLocalData = localStorage.getItem('locations');

if (isLocalData) {
  initialData = JSON.parse(isLocalData);
}
else {
  initialData = dummyData;
}

export default function locations (currentData = initialData, action) {
  let newLocations = [...currentData];
  if (action.type === 'ADD_NEW_LOCATION') {
    newLocations.push(action.data);
    localStorage.setItem('locations', JSON.stringify(newLocations));
    return newLocations;
  }
  if (action.type === 'DELETE_LOCATION') {
    const index = newLocations.findIndex((item)=> item.id === action.id);
    newLocations.splice(index, 1);
    localStorage.setItem('locations', JSON.stringify(newLocations));
    return newLocations;
  }
  if (action.type === 'REMOVE_CATEGORY_FROM_LOCATION') {
    newLocations.forEach((location)=>{if(location.id === action.locationId){
      const index = location.relatedCat.findIndex((cat)=> cat === action.categoryId);
      location.relatedCat.splice(index, 1);
    }});
    localStorage.setItem('locations', JSON.stringify(newLocations));
    return newLocations;
  }
  if (action.type === 'UPDATE_LOCATION_EDITMODE') {
    newLocations.map((item)=>{
      if(item.id === action.id){
        item.isEditMode = action.mode;
      }
    });
    localStorage.setItem('locations', JSON.stringify(newLocations));
    return newLocations;
  }
  localStorage.setItem('locations', JSON.stringify(newLocations));
  return newLocations;
}

