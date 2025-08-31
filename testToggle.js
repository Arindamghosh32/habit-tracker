const axios = require('axios');

async function testToggle() {
  try {
    const res = await axios.patch(
      "http://localhost:5000/api/habits/1756668800249",
      { date: new Date().toISOString() }
    );
    console.log(res.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

testToggle();
