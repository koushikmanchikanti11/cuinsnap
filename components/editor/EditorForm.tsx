"use client";

interface Props {
  tag: string;
  comment: string;
  onTagChange: (value: string) => void;
  onCommentChange: (value: string) => void;
}

export default function EditorForm({
  tag,
  comment,
  onTagChange,
  onCommentChange,
}: Props) {
  return (
    <div className="space-y-3 w-full">
      {/* Tag Input */}
      <div>
        <label
          htmlFor="tag"
          className="block text-[11px] font-bold uppercase tracking-widest text-[#3B1F0A]/40 mb-1 font-dm-sans"
        >
          #tag
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-4 font-bold text-[#3B1F0A]/40 font-dm-sans">#</span>
          <input
            id="tag"
            type="text"
            value={tag}
            onChange={(e) => {
              const val = e.target.value.replace(/^#/, "");
              onTagChange(val);
            }}
            placeholder="biriyani"
            maxLength={60}
            className="w-full pl-8 pr-4 py-2.5 rounded-2xl border border-[#3B1F0A]/15 bg-white text-[#3B1F0A] text-[14px] font-dm-sans placeholder:text-[#3B1F0A]/30 focus:outline-none focus:border-[#E8622A]/50 focus:ring-1 focus:ring-[#E8622A]/20 transition-colors"
          />
        </div>
      </div>

      {/* Comment Input */}
      <div>
        <label
          htmlFor="comment"
          className="block text-[11px] font-bold uppercase tracking-widest text-[#3B1F0A]/40 mb-1 font-dm-sans"
        >
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="This is so good!"
          maxLength={150}
          rows={2}
          className="w-full px-4 py-2.5 rounded-2xl border border-[#3B1F0A]/15 bg-white text-[#3B1F0A] text-[14px] font-dm-sans placeholder:text-[#3B1F0A]/30 focus:outline-none focus:border-[#E8622A]/50 focus:ring-1 focus:ring-[#E8622A]/20 transition-colors resize-none"
        />
      </div>
    </div>
  );
}
