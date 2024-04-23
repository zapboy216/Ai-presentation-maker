"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import useUpdateSlide from "../../actions/useUpdateSlide";
import { SlideModel } from "@/app/types";

export interface SlideProps {
  slide: SlideModel;
  partialUpdateSlide: (partialSlide: Partial<SlideModel>) => void;
}

export const Slide = (props: SlideProps) => {
  const backgroundImage =
    'url("https://source.unsplash.com/featured/?' +
    encodeURIComponent(props.slide.backgroundImageDescription) +
    '")';

  /**
   * This action allows the Copilot to  update the current slide.
   */
  useUpdateSlide({ partialUpdateSlide: props.partialUpdateSlide });

  return (
    <div className="w-full h-full flex flex-row bg-white">
      <div className="flex-grow h-full flex flex-col" style={{flex: "2"}}>
        <SlideContent
          content={props.slide.content}
          onChange={(newContent) => {
            props.partialUpdateSlide({ content: newContent });
          }}
        />
        <SlideSpeakerNotes
          spokenNarration={props.slide.spokenNarration}
          onChange={(newSpokenNarration) => {
            props.partialUpdateSlide({ spokenNarration: newSpokenNarration });
          }}
        />
      </div>
      <SlideImage backgroundImage={backgroundImage} />
    </div>
  );
};

function SlideImage({ backgroundImage }: { backgroundImage: string }) {
  return (
    <div
      className="flex-grow h-full bg-slate-200"
      style={{
        flex: "1",
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

interface SpeakerNotesProps {
  spokenNarration: string;
  onChange: (newSpokenNarration: string) => void;
}

function SlideSpeakerNotes({ spokenNarration, onChange }: SpeakerNotesProps) {
  return (
    <div className="bg-gray-200 relative flex flex-col italic shadow-lg rounded">
      <textarea
        className="w-full bg-transparent p-10 my-10 text-base"
        style={{
          border: "none",
          outline: "none",
          lineHeight: "1.5",
          resize: "none",
        }}
        placeholder="Speaker notes..."
        value={spokenNarration}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

interface SlideContentProps {
  content: string;
  onChange: (newContent: string) => void;
}

function SlideContent({ content, onChange }: SlideContentProps) {
  return (
    <textarea
    className="flex-1 w-full text-gray-800 p-4 px-10 font-bold italic shadow-lg rounded-md flex items-center line-clamp-6"
    style={{
      border: "none",
      outline: "none",
      resize: "none",
      fontSize: "1.5vw",
    }}
    value={content}
    placeholder="Slide content..."
    onChange={(e) => {
      onChange(e.target.value);
    }}
  />
  );
}
