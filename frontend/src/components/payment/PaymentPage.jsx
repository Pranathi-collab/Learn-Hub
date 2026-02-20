import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../common/AxiosInstance";

function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: ""
  });

  const handlePayment = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  await API.post(`/enroll/${id}`, {
    userId: user._id
  });

  navigate(`/course/${id}`);
};

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Secure Payment</h2>

      <div style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "30px",
        background: "#f5e6cc",
        borderRadius: "10px"
      }}>

        <input
          placeholder="Card Holder Name"
          style={inputStyle}
          onChange={(e)=>setCard({...card,name:e.target.value})}
        />

        <input
          placeholder="Card Number"
          style={inputStyle}
          onChange={(e)=>setCard({...card,number:e.target.value})}
        />

        <input
          placeholder="Expiry (MM/YY)"
          style={inputStyle}
          onChange={(e)=>setCard({...card,expiry:e.target.value})}
        />

        <input
          placeholder="CVV"
          style={inputStyle}
          onChange={(e)=>setCard({...card,cvv:e.target.value})}
        />

        <button
          onClick={handlePayment}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

export default PaymentPage;