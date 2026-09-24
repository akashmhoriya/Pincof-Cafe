import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);

    formData.append("access_key", "564c3c11-e8ce-4bb9-9aff-b936cff70aa3");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
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

          {/* Subject */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="subject"
              className="text-xs uppercase font-sans tracking-widest text-caramel-300 font-medium">
              Inquiry Topic <span className="text-red-400">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-espresso-950/70 border border-cream-300/15 rounded-xl px-4 py-3 text-sm text-cream-100 focus:outline-none focus:border-caramel-400 transition-colors">
              <option value="" disabled>
                Select inquiry type...
              </option>
              <option value="Table Reservation">Café Table Reservation</option>
              <option value="Private Event & Salon">
                Private Event &amp; Acoustic Salon
              </option>
              <option value="Wholesale & Roastery Beans">
                Wholesale &amp; Micro-Lot Beans
              </option>
              <option value="Press & Collaboration">
                Press &amp; Creative Collaboration
              </option>
              <option value="General Question">General Question</option>
            </select>
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
