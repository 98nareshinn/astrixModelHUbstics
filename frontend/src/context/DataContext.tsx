import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { properties as seedProperties } from "../data/seed";
import type { Property, Enquiry } from "../data/types";

interface DataContextValue {
  properties: Property[];
  enquiries: Enquiry[];
  addProperty: (p: Property) => void;
  approveProperty: (id: string) => void;
  rejectProperty: (id: string) => void;
  addEnquiry: (e: Enquiry) => void;
  addComment: (propertyId: string, author: string, text: string) => void;
  toggleLike: (propertyId: string) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);
const PROP_KEY = "bs-properties";
const ENQ_KEY = "bs-enquiries";

export function DataProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem(PROP_KEY);
    return saved ? JSON.parse(saved) : seedProperties;
  });
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(ENQ_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(PROP_KEY, JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem(ENQ_KEY, JSON.stringify(enquiries));
  }, [enquiries]);

  const addProperty = (p: Property) => setProperties((prev) => [p, ...prev]);

  const approveProperty = (id: string) =>
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, status: "PUBLISHED" } : p)));

  const rejectProperty = (id: string) =>
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, status: "REJECTED" } : p)));

  const addEnquiry = (e: Enquiry) => setEnquiries((prev) => [e, ...prev]);

  const addComment = (propertyId: string, author: string, text: string) =>
    setProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: `c-${Date.now()}`, author, text, at: new Date().toISOString().slice(0, 10) },
              ],
            }
          : p
      )
    );

  const toggleLike = (propertyId: string) =>
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, likes: p.likes + 1 } : p))
    );

  return (
    <DataContext.Provider
      value={{ properties, enquiries, addProperty, approveProperty, rejectProperty, addEnquiry, addComment, toggleLike }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
