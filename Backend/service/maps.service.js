import axios from 'axios';
import { Captain } from '../Models/captain.schema.js';

export const getAddressCoordinators = async (address) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    } else {
      throw new Error('Unable to fetch coordinates');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('origin and destination are required');
  }

  const api_key = process.env.GOOGLE_MAPS_API_KEY
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${api_key}`;
  
try {
  
  const response=await axios.get(url)
  console.log(response);
  
  if(response?.data?.status==='OK'){
    if(response?.data?.rows[ 0 ].elements[ 0 ].status ==='ZERO_RESULTS' ){
      throw new Error('no Routes found')
    }
    return response?.data?.rows[ 0 ].elements[ 0 ]
  }else{
    throw new Error ("unable to fetch distance and time")
  }

} catch (error) {
  console.log(error);
  throw error 
}
}

export const getAutoCompleteSuggestionsfunc = async (input) => {
  if (!input) {
    throw new Error('query is required');
  }

  const api_key = process.env.GOOGLE_MAPS_API_KEY;
  // Updated input encoding in URL
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${api_key}`;

  try {
    const response = await axios.get(url);
    if (response?.data?.status === 'OK' || response?.data?.status === 'ZERO_RESULTS') {
      return response?.data?.predictions || [];
    } else {
      // Log the full response for debugging
      console.error("Autocomplete API error:", response.data);
      throw new Error(response.data.error_message || 'Unable to fetch autocomplete suggestions');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getCaptainsInTheRadius=async(ltd,lng,radius)=>{
    const captains=await Captain.find({
      location:{
        $geoWithin:{
          $centerSphere:[[ltd, lng], radius/3963.2]
        }
      }
    });

    return captains 
}