import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Checkbox,
  TextField as MUITextField,
} from "@mui/material";
import { generatePassword } from "../utils/passUtils";

export default function PasswordGenerator({ isDarkMode }) {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    upper: { min: 1, max: 3 },
    lower: { min: 1, max: 3 },
    numbers: { min: 1, max: 3 },
    symbols: { min: 1, max: 3 },
  });

  const [password, setPassword] = useState(generatePassword(length, options));
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newPassword = generatePassword(length, options);
    setPassword(newPassword);
    setCopied(false);
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

  const isStrong =
    length >= 12 &&
    Object.values(options).every((opt) => opt.min > 0);

  return (
    <div className={isDarkMode ? "bg-black text-white" : "bg-white text-black"}>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Password Generator</h1>
        <p className="mb-6 text-center">
          Create strong passwords for your online accounts in the blink of an eye.
        </p>

        <div className="rounded-2xl p-6 w-full max-w-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 overflow-x-auto border-2 rounded-md px-2 py-1 mr-2">
              <span className="text-sm font-mono break-all">{password}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={handleGenerate} className="text-xl" title="Regenerate">
                🔄
              </button>
              <button
                onClick={handleCopy}
                className="bg-teal-400 hover:bg-teal-500 text-black font-semibold px-4 py-2 rounded-lg text-sm"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="flex items-center gap-2">
              Password strength:
              <span
                className={`font-semibold ${
                  isStrong ? "text-green-600" : "text-yellow-500"
                }`}
              >
                {isStrong ? "Strong" : "Weak"}
              </span>
            </p>
          </div>

          <div className="mb-4">
            <label>Password length: {length}</label>
            <input
              type="range"
              min="4"
              max="128"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["upper", "lower", "numbers", "symbols"].map((type) => (
              <Box key={type} display="flex" flexDirection="column" gap={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={options[type].min > 0 || options[type].max > 0}
                      onChange={(e) =>
                        handleOptionChange(type, "min", e.target.checked ? 1 : 0)
                      }
                    />
                  }
                  label={`Include ${type}`}
                />
                {(options[type].min > 0 || options[type].max > 0) && (
                  <Box display="flex" gap={1}>
                    <MUITextField
                      type="number"
                      size="small"
                      label="Min"
                      value={options[type].min}
                      onChange={(e) =>
                        handleOptionChange(
                          type,
                          "min",
                          Math.max(0, parseInt(e.target.value) || 0)
                        )
                      }
                      sx={{ width: 80, bgcolor: isDarkMode ? "grey.800" : "white" }}
                    />
                    <MUITextField
                      type="number"
                      size="small"
                      label="Max"
                      value={options[type].max}
                      onChange={(e) =>
                        handleOptionChange(
                          type,
                          "max",
                          Math.max(options[type].min, parseInt(e.target.value) || 0)
                        )
                      }
                      sx={{ width: 80, bgcolor: isDarkMode ? "grey.800" : "white" }}
                    />
                  </Box>
                )}
              </Box>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
