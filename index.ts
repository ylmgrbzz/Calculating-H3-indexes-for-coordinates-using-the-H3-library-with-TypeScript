import * as h3 from "h3-js";
import * as fs from "fs";

export const getH3Index = (lat: number, lng: number, resolution: number) => {
  return h3.latLngToCell(lat, lng, resolution);
};

export const calculateAllH3Index = (filePath: string) => {
  const rawData = fs.readFileSync(filePath);
  const coordinates = JSON.parse(rawData.toString());

  const resolution = 5;
  const h3Indexes = coordinates.map((coord: { lat: number; lng: number }) =>
    getH3Index(coord.lat, coord.lng, resolution)
  );

  // remove duplicates without Set
  const uniqueH3Indexes = h3Indexes.filter((h3Index: string, index: any) => {
    return h3Indexes.indexOf(h3Index) === index;
  });

  console.log("without eliminate duplicate h3 index count:", h3Indexes.length);
  console.log("unique h3 index count:", uniqueH3Indexes.length);
};

calculateAllH3Index("coordinates.json");
