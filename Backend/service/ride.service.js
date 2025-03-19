import { Ride } from "../Models/ride.model.js";
import { getDistanceAndTime } from "./maps.service.js";
import crypto from "crypto";

export async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("pickup and destination are required");
  }

  const distanceAndTime = await getDistanceAndTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const perMinuteRate = {
    auto: 1,
    car: 2,
    motorcycle: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceAndTime.distance.value / 1000) * perKmRate.auto +
        (distanceAndTime.duration.value / 60) * perMinuteRate.auto
    ),
    car:
     Math.round( baseFare.car +
        (distanceAndTime.distance.value / 1000) * perKmRate.car +
        (distanceAndTime.duration.value / 60) * perMinuteRate.car),
    motorcycle:
      Math.round(baseFare.motorcycle +
        (distanceAndTime.distance.value / 1000) * perKmRate.motorcycle +
        (distanceAndTime.duration.value / 60) * perMinuteRate.motorcycle),
  };

  return fare;
}

function getOTP(num) {
  function generateOTP(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOTP(num);
}

export const createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("all fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = await Ride.create({
    user,
    pickup,
    destination,
    fare: fare[vehicleType],
    otp: getOTP(6),
  });

  return ride;
};
