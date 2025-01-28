'use client'
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post("/api/send-email", formData);
      if (response.status === 200) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setError("Failed to send the message. Please try again.");
      console.error(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  const phoneNumber = "254114547447"
  const whatsappLink = `https://wa.me/${phoneNumber}`;


  return (
    <div className=" grid grid-cols-1 md:grid-cols-3">
      <h2 className="text-4xl text-primary font-bold mb-5">Contact Us: </h2>
      <form onSubmit={handleSubmit} className=" ml-5 mr-5 p-10 space-y-4 font-semibold text-lg border border-slate-400 rounded-lg shadow-sm shadow-primary">
      <div>
        <label htmlFor="name" className="block  font-medium  text-md">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block  font-medium text-md">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="message" className="block  font-medium text-md">Message</label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Message sent successfully!</p>}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-lg"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
    <Link href={whatsappLink} className="m-5"><h3 className="inline text-primary text-xl">you can also message us via Whatsapp:{<IoLogoWhatsapp className="inline text-green-400 text-3xl hover:text-green-500" />}</h3></Link> 
  </div>
  );
};

export default ContactForm;
