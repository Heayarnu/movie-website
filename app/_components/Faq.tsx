import { Disclosure, Transition } from '@headlessui/react';
import { PlusIcon, X } from 'lucide-react';
import { useState } from 'react';

const disclosureItems = [
  {
    buttonText: 'What is Netflix?',
    panelText:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
  },
  {
    buttonText: 'How much does Netflix cost?',
    panelText:
      'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₦1,600 to ₦5,000 a month. No extra costs, no contracts.',
  },
  {
    buttonText: 'Where can I watch?',
    panelText:
      "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
  },
  {
    buttonText: 'How do I cancel?',
    panelText:
      'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.',
  },
  {
    buttonText: 'What can I watch on Netflix?',
    panelText:
      'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.',
  },
  {
    buttonText: 'Is Netflix good for kids?',
    panelText:
      'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex justify-center items-center pt-16">
      <div className="mx-7 w-full sm:mx-10 xl:max-w-[70%]">
        {disclosureItems.map((item, index) => (
          <div className="mb-2" key={index}>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="flex w-full h-16 lg:h-20 border-black border-y xl:h-24 2xl:h-28 justify-between items-center bg-stone-700 px-5 py-1 text-left text-xl lg:text-3xl font-medium text-white hover:bg-stone-500"
                  >
                    <span className="text-left">{item.buttonText}</span>
                    <div className="min-h-7 text-white max-h-10 max-w-10 min-w-7 ml-2">
                      {openIndex === index ? <X /> : <PlusIcon />}
                    </div>
                  </Disclosure.Button>

                  <Transition
                    show={openIndex === index}
                    enter="transition ease-out duration-200"
                    enterFrom="transform scale-100 opacity-100"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition ease-out duration-200"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-100"
                  >
                    <Disclosure.Panel className="p-7 text-left text-lg leading-tight text-white lg:text-xl lg:leading-snug bg-stone-600 mb-2">
                      {item.panelText}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
}
