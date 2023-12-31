import { v4 as uuid } from "uuid";
import { updatedDate } from "../utils/authUtils";

export const posts = [
  {
    _id: uuid(),
    image:
      "https://res.cloudinary.com/dwebygldw/image/upload/v1652908952/frittr/zwpmppawiyxwthsmikyk.webp",
    content:
      "Went to this hangout place, Bob's in Marathalli yesterday. The ambience is real good and the mocktails are really fresh.",
    likes: {
      likeCount: 100,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarsh",
    createdAt: new Date("01-01-2022"),
    updatedAt: updatedDate(),
    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        text: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    image:
      "https://res.cloudinary.com/dwebygldw/image/upload/v1653066477/frittr/E-HqxXdWUAM0z-U_a44utb.jpg",
    content:
      "Nairobi is such a great city with so many people going about their business. One thing that you need to know while there are the places where to find great food/meals. ",
    likes: {
      likeCount: 450,
      likedBy: [],
      dislikedBy: [],
    },
    username: "kajal",

    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        text: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: new Date("02-01-2022"),
    updatedAt: updatedDate(),
  },
  {
    _id: uuid(),
    image:
      " https://images.hindustantimes.com/img/2023/01/10/550x309/While-the-past-year-was-about-revenge-and-revival-_1673351689949.jpg",
    content:
      "Nairobi is such a great city with so many people going about their business. One thing that you need to know while there are the places where to find great food/meals. ",
    likes: {
      likeCount: 200,
      likedBy: [],
      dislikedBy: [],
    },
    username: "rahul",

    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        text: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: new Date("03-01-2022"),
    updatedAt: updatedDate(),
  },
  {
    _id: uuid(),
    image:
      "https://res.cloudinary.com/dwebygldw/image/upload/v1653066477/frittr/E-HqxXdWUAM0z-U_a44utb.jpg",
    content:
      "Nairobi is such a great city with so many people going about their business. One thing that you need to know while there are the places where to find great food/meals. ",
    likes: {
      likeCount: 1000,
      likedBy: [],
      dislikedBy: [],
    },
    username: "kajal",

    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        text: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: new Date("04-01-2022"),
    updatedAt: updatedDate(),
  },
  {
    _id: uuid(),
    image:
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlmZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    content: "The purpose of our lives is to be happy.",
    likes: {
      likeCount: 40,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Aakanksha",
    createdAt: new Date("07-01-2022"),
    updatedAt: updatedDate(),
  },
  {
    _id: uuid(),
    image:
      "https://images.unsplash.com/photo-1542353436-312f0e1f67ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpZmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    content: "Life is what happens when you're busy making other plans",
    likes: {
      likeCount: 1200,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Kajal",
    createdAt: new Date("06-01-2022"),
    updatedAt: updatedDate(),
  },
  {
    _id: uuid(),
    image:
      "https://media.istockphoto.com/id/1338906512/photo/indian-sweet-laddu.webp?b=1&s=170667a&w=0&k=20&c=3iJ3fupjFhK1QOeVrl-wTPq9byphBGHy7j4WFkMgyLc=",
    content: "In order to write about life first you must live it.",
    likes: {
      likeCount: 2000,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Surya",
    createdAt: new Date("07-01-2022"),
    updatedAt: updatedDate(),
  },
];
