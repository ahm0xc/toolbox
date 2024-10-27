"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import html2canvas from "html2canvas";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Label } from "~/components/ui/label";

const googleFonts = [
  "Inter",
  "PT Sans",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Raleway",
  "Poppins",
];

const fontWeights = ["300", "400", "500", "600"];

const fontSizes = ["16", "18", "20", "22", "24", "26", "28", "30"];

export default function TwitterScreenshotGenerator() {
  const [tweetText, setTweetText] = useState("");
  const [username, setUsername] = useState("@ahadinsights");
  const [date, setDate] = useState("10:39 AM Â· Oct, 2024");
  const [wordCount, setWordCount] = useState(0);
  const [font, setFont] = useState("Inter");
  const [fontWeight, setFontWeight] = useState("400");
  const [fontSize, setFontSize] = useState("24");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("#000000");
  const tweetRef = useRef(null);
  const MAX_CHARS = 280;
  const MAX_WORDS = 40;

  useEffect(() => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css?family=${font.replace(
      " ",
      "+"
    )}:300,400,500,600&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [font]);

  const handleTextChange = (
    e: ChangeEvent<HTMLTextAreaElement | undefined>
  ) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    if (words.length <= MAX_WORDS && text.length <= MAX_CHARS) {
      setTweetText(text);
      setWordCount(words.length);
    }
  };

  const generateScreenshot = async () => {
    if (tweetRef.current) {
      const canvas = await html2canvas(tweetRef.current, {
        backgroundColor: bgColor,
        width: 600,
        height: 750,
        scale: 2,
      });
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = "tweet-screenshot.png";
      link.href = image;
      link.click();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="tweet-text">Tweet Text</Label>
        <Textarea
          id="tweet-text"
          placeholder="Enter your tweet text here..."
          value={tweetText}
          onChange={handleTextChange}
          className="w-full resize-none bg-gray-100 text-gray-900"
          rows={6}
        />
        <div className="text-sm text-right">
          {wordCount}/{MAX_WORDS} words | {tweetText.length}/{MAX_CHARS}{" "}
          characters
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="font">Font</Label>
          <Select onValueChange={setFont} defaultValue={font}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {googleFonts.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="font-weight">Font Weight</Label>
          <Select onValueChange={setFontWeight} defaultValue={fontWeight}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select font weight" />
            </SelectTrigger>
            <SelectContent>
              {fontWeights.map((w) => (
                <SelectItem key={w} value={w}>
                  {w}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="font-size">Font Size</Label>
          <Select onValueChange={setFontSize} defaultValue={fontSize}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="text-color">Text Color</Label>
          <Input
            id="text-color"
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-10"
          />
        </div>
        <div>
          <Label htmlFor="bg-color">Background Color</Label>
          <Input
            id="bg-color"
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-10"
          />
        </div>
      </div>
      <div
        ref={tweetRef}
        className="rounded-lg flex flex-col items-center justify-center"
        style={{
          width: "600px",
          height: "750px",
          margin: "0 auto",
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src="/placeholder.svg?height=48&width=48"
                alt="@username"
              />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-xl">Ahad Khaled</p>
              <p style={{ color: `${textColor}80` }}>{username}</p>
            </div>
          </div>
          <div
            className="whitespace-pre-wrap"
            style={{
              fontFamily: font,
              fontWeight: fontWeight,
              fontSize: `${fontSize}px`,
              lineHeight: "1.2",
            }}
          >
            {tweetText}
          </div>
          <div style={{ color: `${textColor}80` }}>{date}</div>
        </div>
      </div>
      <Button
        onClick={generateScreenshot}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Generate Screenshot
      </Button>
    </div>
  );
}
