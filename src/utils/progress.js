export async function updateProgress(topic, status) {

  const token = localStorage.getItem("token");

  // If user is not logged in, don't save progress
  if (!token) {
    return;
  }

  try {

    const response = await fetch(
      "http://localhost:5000/api/progress",
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          topic,
          status
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Progress update failed:",
        data.message
      );

      return;
    }

    console.log(
      `${topic} progress updated to ${status}`
    );

  } catch (error) {

    console.error(
      "Progress API error:",
      error
    );

  }
}