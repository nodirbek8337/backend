import { Request, Response } from "express";
import { Contact } from "../models/contact.model";

// 🔹 1. Barcha Contact larni olish
export const getAllContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 2. Yangi Contact qo'shish
export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, position, officeHour, officeLocation, address, email, phone, fax, imageUrl } = req.body;

    const newContact = new Contact({
      fullName,
      position,
      officeHour,
      officeLocation,
      address,
      email,
      phone,
      fax,
      imageUrl
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 3. ID bo‘yicha bitta Contact ni olish
export const getContactById = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Contact topilmadi" });
      return;
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 4. Contact ni yangilash
export const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, position, officeHour, officeLocation, address, email, phone, fax, imageUrl } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        position,
        officeHour,
        officeLocation,
        address,
        email,
        phone,
        fax,
        imageUrl
      },
      { new: true }
    );

    if (!updatedContact) {
      res.status(404).json({ message: "Contact topilmadi" });
      return;
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// 🔹 5. Contact ni o‘chirish
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      res.status(404).json({ message: "Contact topilmadi" });
      return;
    }

    res.json({ message: "Contact o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};
