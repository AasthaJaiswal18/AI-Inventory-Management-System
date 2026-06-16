import { useEffect, useState } from "react";
import API from "../services/api";

function AIStockPrediction() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPrediction();
  }, []);

  const fetchPrediction = async () => {
    try {

      const response = await API.get(
        "/products/ai-stock-prediction"
      );

      setData(response.data.predictions);

    } catch (error) {

      console.log("AI Prediction Error:", error);

    }
  };


  return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8 text-purple-700">
        🧠 AI Stock Prediction
      </h1>


      <div className="grid md:grid-cols-2 gap-6">

        {data.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6"
          >

            <h2 className="text-2xl font-bold">
              {item.name}
            </h2>


            <p className="mt-2">
              <strong>Category:</strong> {item.category}
            </p>


            <p>
              <strong>Current Stock:</strong>
              {" "}{item.currentStock}
            </p>


            <p className="mt-3 font-semibold text-blue-600">
              {item.prediction}
            </p>


            <p className="mt-2 text-gray-700">
              💡 {item.recommendation}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AIStockPrediction;