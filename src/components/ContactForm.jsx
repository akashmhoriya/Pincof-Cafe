import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, ChevronDown, Check } from "lucide-react";
import toast from "react-hot-toast";

const INQUIRY_TOPICS = [
  "Café Table Reservation",
  "Private Event & Salon",
  "Wholesale & Roastery Beans",
  "Press & Collaboration",
  "General Question",
];

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownHighlighted, setDropdownHighlighted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!formData.subject) {
      setDropdownHighlighted(true);
      setIsDropdownOpen(true);
      toast.error("Please choose an inquiry topic");
      return;
    }
    setDropdownHighlighted(false);

    setIsSubmitting(true);
    const formDataObj = new FormData(event.target);

    formDataObj.append("access_key", "564c3c11-e8ce-4bb9-9aff-b936cff70aa3");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Thank you for your submission!");
        event.target.reset();
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setIsDropdownOpen(false);
      } else {
        console.log("Error", data);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full rounded-2xl glass-card p-8 sm:p-12 border border-cream-300/10 shadow-2xl">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="name"
              className="text-xs uppercase font-sans tracking-widest text-caramel-300 font-medium">
              Your Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Maya Lin"
              className="w-full bg-espresso-950/70 border border-cream-300/15 rounded-xl px-4 py-3 text-sm text-cream-100 placeholder:text-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-xs uppercase font-sans tracking-widest text-caramel-300 font-medium">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="maya@example.com"
              className="w-full bg-espresso-950/70 border border-cream-300/15 rounded-xl px-4 py-3 text-sm text-cream-100 placeholder:text-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Phone Number (Optional) */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="phone"
              className="text-xs uppercase font-sans tracking-widest text-caramel-300 font-medium">
              Phone{" "}
              <span className="text-cream-400/40 text-[10px] lowercase">
                (optional)
              </span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-espresso-950/70 border border-cream-300/15 rounded-xl px-4 py-3 text-sm text-cream-100 placeholder:text-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors"
            />
          </div>

          {/* Subject Dropdown */}
          <div className="flex flex-col space-y-2 relative" ref={dropdownRef}>
            <label
              htmlFor="subject-trigger"
              className="text-xs uppercase font-sans tracking-widest text-caramel-300 font-medium">
              Inquiry Topic <span className="text-red-400">*</span>
            </label>

            {/* Hidden Input for Form Submission */}
            <input type="hidden" name="subject" value={formData.subject} />

            {/* Clean Dropdown Button */}
            <button
              id="subject-trigger"
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              className={`w-full bg-espresso-950/70 border rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between transition-colors focus:outline-none ${
                dropdownHighlighted
                  ? "border-red-400/80"
                  : isDropdownOpen
                  ? "border-caramel-400"
                  : "border-cream-300/15 hover:border-cream-300/30"
              }`}>
              <span className={formData.subject ? "text-cream-100" : "text-cream-400/30"}>
                {formData.subject || "Select inquiry type..."}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-cream-400/40 transition-transform duration-200 flex-shrink-0 ml-2 ${
                  isDropdownOpen ? "rotate-180 text-caramel-400" : ""
                }`}
              />
            </button>

            {/* Simple, Elegant Menu */}
            {isDropdownOpen && (
              <div
                role="listbox"
                className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#160e0a] border border-cream-300/15 rounded-xl shadow-2xl p-1.5 space-y-0.5">
                {INQUIRY_TOPICS.map((topic) => {
                  const isSelected = formData.subject === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, subject: topic }));
                        setIsDropdownOpen(false);
                        setDropdownHighlighted(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                        isSelected
                          ? "bg-caramel-500/10 text-caramel-300 font-medium"
                          : "text-cream-200/80 hover:text-cream-100 hover:bg-cream-100/5"
                      }`}>
                      <span>{topic}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-caramel-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="message"
            className="text-xs uppercase font-sans tracking-widest text-caramel-300 font-medium">
            Your Message <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can curate your café experience..."
            className="w-full bg-espresso-950/70 border border-cream-300/15 rounded-xl px-4 py-3 text-sm text-cream-100 placeholder:text-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-full bg-caramel-500 text-espresso-950 font-sans text-sm font-semibold tracking-widest uppercase hover:bg-caramel-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-caramel-500/20 disabled:opacity-50">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Your Note...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
