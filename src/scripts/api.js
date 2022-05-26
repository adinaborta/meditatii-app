import axios from "axios";

export async function deleteItem(endpoint) {
  await axios.delete(`http://localhost:3001/${endpoint}`).then((response) => {
    console.log(response);
  });
}

export async function createItem(body, endpoint) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:3001/${endpoint}`, body).then((response) => {
      console.log(response);
      resolve(response);
    });
  });
}

export async function getHomeworkList(user_id, setHomeworkListComplete) {
  await axios
    .get(`http://localhost:3001/getHomeworksForUser?user_id=${user_id}`)
    .then(function (response) {
      setHomeworkListComplete(response.data.responseData);
    });
}

export async function getClassroomList(user_id, setClassroomListComplete) {
  await axios
    .get(`http://localhost:3001/getClassroomsForUser?user_id=${user_id}`)
    .then(function (response) {
      setClassroomListComplete(response.data.responseData);
    });
}

export async function getClassroomUsers(
  user_id,
  classroom_id,
  setUsers,
  studentsOnly
) {
  if (classroom_id)
    await axios
      .get(
        `http://localhost:3001/getClassroomUsers?user_id=${user_id}&classroom_id=${classroom_id}&students_only=${studentsOnly}`
      )
      .then(function (response) {
        console.log("response");
        setUsers(response.data.responseData);
      });
}

export async function uploadFile(formData, endpoint, then) {
  console.log("uploadFile");
  await axios
    .post(`http://localhost:3001/${endpoint}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      then();
    });
}
