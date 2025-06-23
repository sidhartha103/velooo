import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const faqs = [
    {
        question: "What is VeloStream?",
        answer: "VeloStream is a platform that connects you with professional creators to produce high-quality reel content in just 10 minutes. We handle everything from booking to delivery, so you can focus on your brand."
    },
    {
        question: "How fast is the turnaround time?",
        answer: "Our signature feature is our speed. You'll receive your fully edited, ready-to-post reel within 10 minutes of the shoot concluding. It's perfect for capturing timely events and trends."
    },
    {
        question: "What kind of events can I book a creator for?",
        answer: "You can book a VeloStream creator for a wide range of events, including fashion shoots, product launches, corporate events, weddings, concerts, and even casual content for your social media channels."
    },
    {
        question: "Are the creators professionals?",
        answer: "Absolutely. All creators on our platform are carefully vetted for their skill, professionalism, and experience. We ensure they use top-tier equipment and techniques to deliver cinematic-quality content."
    },
    {
        question: "How does the complimentary shoot work?",
        answer: "Your first shoot with us is on the house! It's a no-strings-attached way for you to experience the VeloStream difference. Just sign up, book your free shoot, and see the magic for yourself."
    }
]

export function FAQ({ className }: { className?: string }) {
    return (
        <section className={cn("py-20", className)}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">Frequently Asked <span className="text-primary">Questions</span></h2>
                    <p className="text-muted-foreground mt-4 text-lg">
                        Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left text-lg hover:no-underline">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
