const axios = require('axios');

async function testToggleRender() {
  try {
    const res = await axios.patch(
      "https://habit-tracker-p9t3.onrender.com/api/habits/1756668800249",
      { date: new Date().toISOString() }
    );
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Error toggling habit:");
    console.error(err.response?.data || err.message);
  }
}

testToggleRender();
