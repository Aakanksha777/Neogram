import { v4 as uuid } from "uuid";

export const users = [
  {
    _id: uuid(),
    firstName: "bhumi",
    lastName: "bhumi",
    username: "bhumi",
    password: "123",
    bio: "Hey, I am the developer of this app.",
    github_Url: "https://github.com/Aakanksha777",
    createdAt: new Date(),
    updatedAt: null,
    image:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554256/socialmedia/avatars/jane-doe_il3cvx.webp",
  },
  {
    _id: uuid(),
    firstName: "Surya",
    lastName: "Saini",
    username: "surya",
    password: "123",
    bio: "Hey, I am the developer of this app.",
    github_Url: "https://github.com/Aakanksha777",
    createdAt: new Date(),
    updatedAt: null,
    image:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651473734/socialmedia/avatars/adarsh-balika_dct6gm.webp",
  },
  {
    _id: uuid(),
    firstName: "Aakanksha",
    lastName: "Malothia",
    username: "Aakanksha",
    password: "123",
    bio: "Hey, I am the developer of this app.",
    github_Url: "https://github.com/Aakanksha777",
    createdAt: new Date(),
    updatedAt: null,
    image:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651473734/socialmedia/avatars/adarsh-balika_dct6gm.webp",
  },
  {
    _id: uuid(),
    firstName: "Kajal",
    lastName: "Gupta",
    username: "Kajal",
    password: "123",
    createdAt: new Date(),
    updatedAt: null,
    image:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651563581/socialmedia/avatars/carl-smith_mehw0u.webp",
  },
  {
    _id: uuid(),
    firstName: "Rahul",
    lastName: "Vashisth",
    username: "rahul",
    password: "123",
    createdAt: new Date(),
    updatedAt: null,
    image:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554207/socialmedia/avatars/john-doe_gbkuda.webp",
  },
];
