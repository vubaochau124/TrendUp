import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
//import {backendUrl} from '../App.js'
import { backendUrl } from '../../App';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const Inventory_edit = () => {
  const { product_id, product_name } = useParams();
  return (
    <div>
      
    </div>
  )
}

export default Inventory_edit
