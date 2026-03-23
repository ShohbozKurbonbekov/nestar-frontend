export enum PropertyType {
  APARTMENT = "APARTMENT",
  VILLA = "VILLA",
  HOUSE = "HOUSE",
}

export enum PropertyStatus {
  ACTIVE = "ACTIVE",
  SOLD = "SOLD",
  DELETE = "DELETE",
}

export enum PropertyLocation {
  SEOUL = "SEOUL",
  BUSAN = "BUSAN",
  INCHEON = "INCHEON",
  DAEGU = "DAEGU",
  GYEONGJU = "GYEONGJU",
  GWANGJU = "GWANGJU",
  CHONJU = "CHONJU",
  DAEJON = "DAEJON",
  JEJU = "JEJU",
}

export enum PropertySort {
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  LIKES = "propertyLikes",
  VIEWS = "propertyViews",
  RANK = "propertyRank",
  PRICE = "propertyPrice",
}
