import type { ContactInfo, RecommenderContact } from "./profile";
import { isTodo } from "./todo";

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  external: boolean;
}

type LinkCandidate = [source: string, build: () => ContactLink];

const URL_PROTOCOL_PATTERN = /^https?:\/\/(www\.)?/;
const TRAILING_SLASH_PATTERN = /\/$/;
const PHONE_FORMATTING_PATTERN = /[^+\d]/g;

function displayUrl(url: string): string {
  return url.replace(URL_PROTOCOL_PATTERN, "").replace(TRAILING_SLASH_PATTERN, "");
}

function emailLink(email: string): ContactLink {
  return { label: "Email", value: email, href: `mailto:${email}`, external: false };
}

function phoneLink(phone: string): ContactLink {
  return { label: "Phone", value: phone, href: `tel:${phone.replace(PHONE_FORMATTING_PATTERN, "")}`, external: false };
}

function profileLink(label: string, url: string): ContactLink {
  return { label, value: displayUrl(url), href: url, external: true };
}

function collect(candidates: LinkCandidate[]): ContactLink[] {
  return candidates.filter(([source]) => !isTodo(source)).map(([, build]) => build());
}

export function buildContactLinks(contact: ContactInfo): ContactLink[] {
  return collect([
    [contact.email, () => emailLink(contact.email)],
    [contact.phone, () => phoneLink(contact.phone)],
    [
      contact.whatsapp,
      () => ({
        label: "WhatsApp",
        value: "Message me on WhatsApp",
        href: `https://wa.me/${contact.whatsapp}`,
        external: true,
      }),
    ],
    [contact.linkedin, () => profileLink("LinkedIn", contact.linkedin)],
    [contact.github, () => profileLink("GitHub", contact.github)],
  ]);
}

export function buildRecommenderLinks(contact: RecommenderContact): ContactLink[] {
  return collect([
    [contact.email, () => emailLink(contact.email)],
    [contact.phone, () => phoneLink(contact.phone)],
    [contact.linkedin, () => profileLink("LinkedIn", contact.linkedin)],
  ]);
}
