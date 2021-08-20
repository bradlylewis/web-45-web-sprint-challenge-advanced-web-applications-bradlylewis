import React, { useEffect, useState } from "react"
;
import axiosWithAuth from "../helpers/axiosWithAuth";
import fetchColorService from '../services/fetchColorService';

// Components
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = editColor => {
    axiosWithAuth()
      .put(`/api/colors/${editColor.id}`, editColor)
      .then(response => {
        console.log(response)

        let index = colors.findIndex((color) => color.id === editColor.id);
        colors[index] = editColor
        setColors([
          ...colors
        ])
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
      .delete(`/api/colors/${colorToDelete.id}`)
      .then(() => {
        setColors(colors.filter(color => color.id !== colorToDelete.id))
      })
      .catch(error => {
        console.log(error)
      })
  };

  useEffect(() => {
    fetchColorService()
    .then((res) => {
      setColors(res)
    })
  }, []);

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state. DONE
//2. Complete toggleEdit, saveEdit, deleteColor and functions DONE
