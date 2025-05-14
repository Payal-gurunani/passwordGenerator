import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Checkbox,
  TextField as MUITextField,
  Switch,
} from "@mui/material";
import { generatePassword } from "../utils/passUtils.js";
import { useContext } from "react";
import { passwordContext } from "../context/PasswordContext";
export default function PasswordGenerator({ isDarkMode }) {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    upper: { min: 1, max: 3 },
    lower: { min: 1, max: 3 },
    numbers: { min: 1, max: 3 },
    symbols: { min: 1, max: 3 },
  });
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState(generatePassword(length, options));
  const [copied, setCopied] = useState(false);
  const [generateCount, setGenerateCount] = useState(1);


  const { addPass } = useContext(passwordContext)
  const handleGenerate = (count) => {
  const useCount = count ?? generateCount; // use passed count or fallback to current state
  const safeCount = Math.min(useCount, 15);
  const generated = Array.from({ length: safeCount }, () =>
    generatePassword(length, options)
  );

  setPassword(generated[0]);
  setCopied(false);
  generated.forEach((pass) => addPass(pass));
};



  const handleOptionChange = (type, field, value) => {
    setOptions((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (length >= 8 && Object.values(options).every((opt) => opt.min > 0)) {
      return { label: "Strong", color: "text-green-600" };
    } else if (length >= 6) {
      return { label: "Moderate", color: "text-yellow-500" };
    } else {
      return { label: "Weak", color: "text-red-500" };
    }
  };

  const strength = getStrength();

  return (
    
    <div className={isDarkMode ? "bg-black text-white" : "bg-white text-black"}>
      
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        
        <h1 className="text-3xl font-bold mb-4">Password Generator</h1>
        <p className="mb-6 text-center">
          Create strong passwords for your online accounts in the blink of an eye.
        </p>

        <div className="rounded-2xl p-6 w-full max-w-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">

            <div className="flex-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                readOnly
                value={password}
                className="w-full font-mono text-sm border-2 rounded-md px-2 py-1 pr-10 bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xl cursor-pointer"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="flex gap-2 ">
              <button onClick={()=>handleGenerate()} className="text-xl cursor-pointer" title="Regenerate">
                🔄
              </button>
              <button
                onClick={handleCopy}
                className="bg-teal-400 hover:bg-teal-500 text-black font-semibold px-4 py-2 rounded-lg text-sm cursor-pointer"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="flex items-center gap-2">
              Password strength:
              <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="count">How many passwords to generate {generateCount}:</label>
            <input
              id="count"
              type="range"
              min="1"
              max="16"
              value={generateCount}
              onChange={(e) => {
                const value = Math.min(16, parseInt(e.target.value) || 1);
                setGenerateCount(value);
                handleGenerate(value); // Pass value if needed
              }} className="w-full border mt-1 px-2 py-1 rounded cursor-pointer"
            />
          </div>

          <div className="mb-4">
            <label>Password length: {length}</label>
            <input
              type="range"
              min="4"
              max="128"
              value={length}
              onChange={(e) => {
                setLength(Number(e.target.value))
                handleGenerate()
              }}
              className="w-full cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {["upper", "lower", "numbers", "symbols"].map((type) => (
    <Box key={type} display="flex" flexDirection="column" gap={1}>
      <FormControlLabel
        control={
          <Switch
            checked={options[type].min > 0}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setOptions((prev) => ({
                ...prev,
                [type]: {
                  min: isChecked ? 1 : 0,
                  max: isChecked ? Math.max(1, prev[type].max) : 0,
                },
              }));
            }}
             color="primary"
          />
        }
        label={`Include ${type}`}
        labelPlacement="end"
      />

      {(options[type].min > 0 || options[type].max > 0) && (
        <div className="flex flex-col">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Max Characters</span>
            <span>{options[type].max}</span>
          </div>
          <input
            type="range"
            value={options[type].max}
            min={options[type].min}
            max={32}
            onChange={(e) =>
              handleOptionChange(
                type,
                "max",
                Math.max(options[type].min, parseInt(e.target.value) || 0)
              )
            }
            className="w-full"
          />
        </div>
      )}
    </Box>
  ))}
</div>

        </div>
      </div>
    </div>
  );
}
