"use client"

import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Send, FileText, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import Navbar from '@/components/Navbar';

const countryCodes = [
  { code: '+1',   country: 'US', flag: '🇺🇸', name: 'United States',   digits: 10, format: '(###) ###-####' },
  { code: '+1',   country: 'CA', flag: '🇨🇦', name: 'Canada',           digits: 10, format: '(###) ###-####' },
  { code: '+44',  country: 'GB', flag: '🇬🇧', name: 'United Kingdom',   digits: 10, format: '#### ######'    },
  { code: '+61',  country: 'AU', flag: '🇦🇺', name: 'Australia',        digits: 9,  format: '### ### ###'    },
  { code: '+33',  country: 'FR', flag: '🇫🇷', name: 'France',           digits: 9,  format: '# ## ## ## ##'  },
  { code: '+49',  country: 'DE', flag: '🇩🇪', name: 'Germany',          digits: 10, format: '#### #######'   },
  { code: '+39',  country: 'IT', flag: '🇮🇹', name: 'Italy',            digits: 10, format: '### ### ####'   },
  { code: '+34',  country: 'ES', flag: '🇪🇸', name: 'Spain',            digits: 9,  format: '### ### ###'    },
  { code: '+31',  country: 'NL', flag: '🇳🇱', name: 'Netherlands',      digits: 9,  format: '## ### ####'    },
  { code: '+46',  country: 'SE', flag: '🇸🇪', name: 'Sweden',           digits: 9,  format: '##-### ## ##'   },
  { code: '+47',  country: 'NO', flag: '🇳🇴', name: 'Norway',           digits: 8,  format: '#### ####'      },
  { code: '+45',  country: 'DK', flag: '🇩🇰', name: 'Denmark',          digits: 8,  format: '## ## ## ##'    },
  { code: '+41',  country: 'CH', flag: '🇨🇭', name: 'Switzerland',      digits: 9,  format: '### ### ## ##'  },
  { code: '+43',  country: 'AT', flag: '🇦🇹', name: 'Austria',          digits: 10, format: '### #######'    },
  { code: '+32',  country: 'BE', flag: '🇧🇪', name: 'Belgium',          digits: 9,  format: '### ## ## ##'   },
  { code: '+351', country: 'PT', flag: '🇵🇹', name: 'Portugal',         digits: 9,  format: '### ### ###'    },
  { code: '+353', country: 'IE', flag: '🇮🇪', name: 'Ireland',          digits: 9,  format: '## ### ####'    },
  { code: '+64',  country: 'NZ', flag: '🇳🇿', name: 'New Zealand',      digits: 9,  format: '## ### ####'    },
  { code: '+81',  country: 'JP', flag: '🇯🇵', name: 'Japan',            digits: 10, format: '##-####-####'   },
  { code: '+82',  country: 'KR', flag: '🇰🇷', name: 'South Korea',      digits: 10, format: '##-####-####'   },
  { code: '+86',  country: 'CN', flag: '🇨🇳', name: 'China',            digits: 11, format: '### #### ####'  },
  { code: '+91',  country: 'IN', flag: '🇮🇳', name: 'India',            digits: 10, format: '##### #####'    },
  { code: '+55',  country: 'BR', flag: '🇧🇷', name: 'Brazil',           digits: 11, format: '(##) #####-####' },
  { code: '+52',  country: 'MX', flag: '🇲🇽', name: 'Mexico',           digits: 10, format: '## #### ####'   },
  { code: '+54',  country: 'AR', flag: '🇦🇷', name: 'Argentina',        digits: 10, format: '## ####-####'   },
  { code: '+56',  country: 'CL', flag: '🇨🇱', name: 'Chile',            digits: 9,  format: '# #### ####'    },
  { code: '+57',  country: 'CO', flag: '🇨🇴', name: 'Colombia',         digits: 10, format: '### #######'    },
  { code: '+27',  country: 'ZA', flag: '🇿🇦', name: 'South Africa',     digits: 9,  format: '## ### ####'    },
  { code: '+234', country: 'NG', flag: '🇳🇬', name: 'Nigeria',          digits: 10, format: '### ### ####'   },
  { code: '+20',  country: 'EG', flag: '🇪🇬', name: 'Egypt',            digits: 10, format: '### ### ####'   },
  { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE',              digits: 9,  format: '## ### ####'    },
  { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia',     digits: 9,  format: '## ### ####'    },
  { code: '+972', country: 'IL', flag: '🇮🇱', name: 'Israel',           digits: 9,  format: '##-###-####'    },
  { code: '+90',  country: 'TR', flag: '🇹🇷', name: 'Turkey',           digits: 10, format: '### ### ## ##'  },
  { code: '+7',   country: 'RU', flag: '🇷🇺', name: 'Russia',           digits: 10, format: '### ###-##-##'  },
  { code: '+380', country: 'UA', flag: '🇺🇦', name: 'Ukraine',          digits: 9,  format: '## ### ## ##'   },
  { code: '+48',  country: 'PL', flag: '🇵🇱', name: 'Poland',           digits: 9,  format: '### ### ###'    },
  { code: '+420', country: 'CZ', flag: '🇨🇿', name: 'Czech Republic',   digits: 9,  format: '### ### ###'    },
  { code: '+36',  country: 'HU', flag: '🇭🇺', name: 'Hungary',          digits: 9,  format: '## ### ####'    },
  { code: '+40',  country: 'RO', flag: '🇷🇴', name: 'Romania',          digits: 9,  format: '### ### ###'    },
  { code: '+30',  country: 'GR', flag: '🇬🇷', name: 'Greece',           digits: 10, format: '### ### ####'   },
  { code: '+65',  country: 'SG', flag: '🇸🇬', name: 'Singapore',        digits: 8,  format: '#### ####'      },
  { code: '+60',  country: 'MY', flag: '🇲🇾', name: 'Malaysia',         digits: 9,  format: '##-### ####'    },
  { code: '+66',  country: 'TH', flag: '🇹🇭', name: 'Thailand',         digits: 9,  format: '##-###-####'    },
  { code: '+63',  country: 'PH', flag: '🇵🇭', name: 'Philippines',      digits: 10, format: '### ### ####'   },
  { code: '+62',  country: 'ID', flag: '🇮🇩', name: 'Indonesia',        digits: 11, format: '###-####-####'  },
  { code: '+84',  country: 'VN', flag: '🇻🇳', name: 'Vietnam',          digits: 9,  format: '### ### ###'    },
  { code: '+92',  country: 'PK', flag: '🇵🇰', name: 'Pakistan',         digits: 10, format: '### #######'    },
  { code: '+880', country: 'BD', flag: '🇧🇩', name: 'Bangladesh',       digits: 10, format: '####-######'    },
];

function formatPhoneNumber(value: string, format: string): string {
  const digits = value.replace(/\D/g, '');
  let result = '';
  let digitIndex = 0;
  for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
    if (format[i] === '#') {
      result += digits[digitIndex++];
    } else {
      if (digitIndex > 0) result += format[i];
    }
  }
  return result;
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [phoneValue, setPhoneValue] = useState('');
  const [open, setOpen] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value, selectedCountry.format);
    setPhoneValue(formatted);
  };

  const handleCountrySelect = (country: typeof countryCodes[0]) => {
    setSelectedCountry(country);
    setPhoneValue('');
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;

    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
        email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
        phone:   phoneValue ? `${selectedCountry.code} ${phoneValue}` : '',
        subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
        message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      }),
    });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full max-w-screen bg-background"
    >
      <Navbar />

      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[blue]/5 to-[#ff0088]/5 blur-[130px] rounded-full" />
      </div>

      <div className="@container/main relative z-10 py-24 px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl mb-20 flex flex-col items-start gap-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#ff0088]">
            Contact
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Let's start a{" "}
            <span className="bg-gradient-to-r from-[blue] to-[#ff0088] bg-clip-text text-transparent">
              conversation
            </span>
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            Whether you have a project in mind, a partnership opportunity, or just want to talk XR - fill out the form and we'll get back to you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mx-auto max-w-4xl">

          {/* Form */}
          <div className="@3xl/main:col-span-2">
            {submitted ? (
              <div className="rounded-3xl border border-border bg-gradient-to-b from-muted/40 to-muted/10 backdrop-blur-sm p-10 flex flex-col items-center justify-center gap-4 min-h-[400px] text-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[blue]/20 to-[#ff0088]/20 border border-border flex items-center justify-center">
                  <Send className="h-5 w-5 text-[#ff0088]" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Thanks for reaching out. We'll get back to you as soon as possible.
                </p>
                <Button
                  variant="outline"
                  className="mt-2 rounded-full"
                  onClick={() => { setSubmitted(false); setPhoneValue(''); }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-border bg-gradient-to-b from-muted/40 to-muted/10 backdrop-blur-sm p-8 sm:p-10 flex flex-col gap-6"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="name" placeholder="Your Name" required className="pl-9 rounded-xl" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="you@example.com" required className="pl-9 rounded-xl" />
                    </div>
                  </div>
                </div>

                {/* Phone + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">
                      Phone{" "}
                      <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                    </Label>
                    <div className="flex gap-2">
                      {/* Country code dropdown */}
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-xl px-3 gap-1.5 shrink-0 font-normal text-sm"
                          >
                            <span>{selectedCountry.flag}</span>
                            <span className="text-muted-foreground">{selectedCountry.code}</span>
                            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList className="max-h-60">
                              <CommandEmpty>No country found.</CommandEmpty>
                              <CommandGroup>
                                {countryCodes.map((c) => (
                                  <CommandItem
                                    key={c.country}
                                    value={`${c.name} ${c.code} ${c.country}`}
                                    onSelect={() => handleCountrySelect(c)}
                                    className="flex items-center gap-2 cursor-pointer"
                                  >
                                    <span>{c.flag}</span>
                                    <span className="flex-1 text-sm">{c.name}</span>
                                    <span className="text-xs text-muted-foreground">{c.code}</span>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      {/* Phone input */}
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={phoneValue}
                          onChange={handlePhoneChange}
                          placeholder={selectedCountry.format.replace(/#/g, '0')}
                          className="pl-9 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="subject" placeholder="Partnership, media inquiry..." required className="pl-9 rounded-xl" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us what's on your mind..."
                    required
                    rows={6}
                    className="rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="self-start w-full rounded-full bg-gradient-to-r from-[blue] to-[#ff0088] text-white font-bold px-8 py-6 text-sm hover:opacity-90 transition-opacity shadow-md shadow-blue-500/5"
                >
                  <Send className="h-4 w-4" />
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}