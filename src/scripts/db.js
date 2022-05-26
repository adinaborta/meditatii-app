import axios from "axios";

const homeworks = [
  {
    title: "Matrice",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend malesuada malesuada. Maecenas interdum lorem elit, eget venenatis sem tempus sed. Sed lobortis nec sem et lobortis. Praesent malesuada suscipit lorem vitae malesuada. Maecenas gravida sodales venenatis. In a massa orci. Duis dignissim et orci ac maximus. ",
    classroom: "Informatica",
    dueTime: "December 1st, 23:59",
  },
  {
    title: "Vectori",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend malesuada malesuada. Maecenas interdum lorem elit, eget venenatis sem tempus sed. Sed lobortis nec sem et lobortis. Praesent malesuada suscipit lorem vitae malesuada. Maecenas gravida sodales venenatis. In a massa orci. Duis dignissim et orci ac maximus. ",
    classroom: "Informatica",
    dueTime: "January 15th, 12:00",
  },
  {
    title: "Literature",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend malesuada malesuada. Maecenas interdum lorem elit, eget venenatis sem tempus sed. Sed lobortis nec sem et lobortis. Praesent malesuada suscipit lorem vitae malesuada. Maecenas gravida sodales venenatis. In a massa orci. Duis dignissim et orci ac maximus. ",
    classroom: "English",
    dueTime: "January 16th, 12:00",
  },
  {
    title: "Matrice",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend malesuada malesuada. Maecenas interdum lorem elit, eget venenatis sem tempus sed. Sed lobortis nec sem et lobortis. Praesent malesuada suscipit lorem vitae malesuada. Maecenas gravida sodales venenatis. In a massa orci. Duis dignissim et orci ac maximus. ",
    classroom: "Informatica",
    dueTime: "December 1st, 23:59",
  },
  {
    title: "Vectori",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend malesuada malesuada. Maecenas interdum lorem elit, eget venenatis sem tempus sed. Sed lobortis nec sem et lobortis. Praesent malesuada suscipit lorem vitae malesuada. Maecenas gravida sodales venenatis. In a massa orci. Duis dignissim et orci ac maximus. ",
    classroom: "Informatica",
    dueTime: "January 15th, 12:00",
  },
  {
    title: "Literature",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend malesuada malesuada. Maecenas interdum lorem elit, eget venenatis sem tempus sed. Sed lobortis nec sem et lobortis. Praesent malesuada suscipit lorem vitae malesuada. Maecenas gravida sodales venenatis. In a massa orci. Duis dignissim et orci ac maximus. ",
    classroom: "English",
    dueTime: "January 16th, 12:00",
  },
];

// const classrooms = [
//   {
//     title: "Informatica",
//     teacher: "Miss Hello World",
//   },
//   {
//     title: "English",
//     teacher: "Miss Jane",
//   },
//   {
//     title: "Informatica",
//     teacher: "Miss Hello World",
//   },
//   {
//     title: "English",
//     teacher: "Miss Jane",
//   },
// ];

export function getHomeworkList() {
  return homeworks;
}
