import { useState, useEffect } from "react";
import API from "../../api";
import { toast } from "react-toastify";

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certificateId.trim()) {
      toast.warn("Please enter a certificate ID");
      return;
    }

    try {
      const res = await API.get(`/certificates/verify/${certificateId}`);
      setResult(res.data);

      // Auto-download the certificate if valid
      if (res.data.valid && res.data.file) {
        const link = document.createElement("a");
        link.href = res.data.file;
        link.download = `BM_CERT_${certificateId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error(err);
      setResult({ valid: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Verify Certificate</h1>
        <p className="text-gray-600 mb-6">
          Enter the certificate ID to check its authenticity.
        </p>

        <form onSubmit={handleVerify} className="flex flex-col space-y-4">
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter Certificate ID"
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-md hover:bg-yellow-500 transition"
          >
            Verify
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 rounded-xl border">
            {result.valid ? (
              <div className="text-left">
                <h2 className="text-green-600 font-bold text-lg">✅ Certificate Verified</h2>
                <p className="mt-2"><span className="font-semibold">Name:</span> {result.name}</p>
                <p><span className="font-semibold">Course:</span> {result.course}</p>
                <p><span className="font-semibold">Issued Date:</span> {result.issuedDate}</p>
                {result.file && (
                  <p className="text-blue-600 underline mt-2">📄 Certificate downloaded automatically</p>
                )}
              </div>
            ) : (
              <p className="text-red-600 font-semibold">❌ Invalid Certificate ID</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
