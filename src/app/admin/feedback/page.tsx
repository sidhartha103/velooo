'use client';

import { useTestimonials, type Testimonial } from '@/context/testimonials-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown, MessageSquare, Trash2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FeedbackManagementPage() {
    const { testimonials, approveTestimonial, rejectTestimonial, deleteTestimonial } = useTestimonials();
    const { toast } = useToast();

    const pending = testimonials.filter(t => t.status === 'pending');
    const approved = testimonials.filter(t => t.status === 'approved');
    const rejected = testimonials.filter(t => t.status === 'rejected');

    const handleApprove = (id: number) => {
        const testimonial = testimonials.find(t => t.id === id);
        const wasRejected = testimonial?.status === 'rejected';
        approveTestimonial(id);
        if (wasRejected) {
             toast({ title: 'Feedback Shown', description: 'This testimonial will now appear on the homepage.' });
        } else {
            toast({ title: 'Feedback Approved', description: 'This testimonial will now appear on the homepage.' });
        }
    };

    const handleReject = (id: number) => {
        const testimonial = testimonials.find(t => t.id === id);
        const wasApproved = testimonial?.status === 'approved';
        rejectTestimonial(id);
        if (wasApproved) {
            toast({ title: 'Feedback Hidden', description: 'This testimonial will no longer appear on the homepage.' });
        } else {
            toast({ title: 'Feedback Rejected' });
        }
    };

    const handleDelete = (id: number) => {
        deleteTestimonial(id);
        toast({
            variant: 'destructive',
            title: 'Feedback Deleted',
            description: 'The testimonial has been permanently removed.',
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Feedback Management</h1>
            <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
                    <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                    <FeedbackList
                        testimonials={pending}
                        title="Pending Approval"
                        description="Review the following submissions."
                        status="pending"
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onDelete={handleDelete}
                    />
                </TabsContent>
                <TabsContent value="approved">
                    <FeedbackList
                        testimonials={approved}
                        title="Approved Feedback"
                        description="These testimonials are live on your site."
                        status="approved"
                        onReject={handleReject}
                        onDelete={handleDelete}
                    />
                </TabsContent>
                <TabsContent value="rejected">
                    <FeedbackList
                        testimonials={rejected}
                        title="Rejected Feedback"
                        description="These submissions were not approved."
                        status="rejected"
                        onApprove={handleApprove}
                        onDelete={handleDelete}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

interface FeedbackListProps {
    testimonials: Testimonial[];
    title: string;
    description: string;
    status: 'pending' | 'approved' | 'rejected';
    onApprove?: (id: number) => void;
    onReject?: (id: number) => void;
    onDelete?: (id: number) => void;
}

function FeedbackList({ testimonials, title, description, status, onApprove, onReject, onDelete }: FeedbackListProps) {
    if (testimonials.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                        <MessageSquare className="mx-auto h-12 w-12" />
                        <p className="mt-4">No submissions here.</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {testimonials.map(testimonial => (
                    <Card key={testimonial.id} className="bg-muted/50">
                        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                                <CardDescription>{testimonial.role}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground">"{testimonial.text}"</p>
                        </CardContent>
                        {(onApprove || onReject || onDelete) && (
                            <CardFooter className="justify-end gap-2">
                                {status === 'pending' && onReject && (
                                    <Button variant="outline" size="sm" onClick={() => onReject(testimonial.id)}>
                                        <ThumbsDown className="mr-2 h-4 w-4" />
                                        Reject
                                    </Button>
                                )}
                                {status === 'pending' && onApprove && (
                                    <Button size="sm" onClick={() => onApprove(testimonial.id)}>
                                        <ThumbsUp className="mr-2 h-4 w-4" />
                                        Approve
                                    </Button>
                                )}
                                {status === 'approved' && onReject && (
                                    <Button variant="outline" size="sm" onClick={() => onReject(testimonial.id)}>
                                        <EyeOff className="mr-2 h-4 w-4" />
                                        Hide
                                    </Button>
                                )}
                                {status === 'rejected' && onApprove && (
                                    <Button size="sm" onClick={() => onApprove(testimonial.id)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        Show
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button variant="destructive" size="sm" onClick={() => onDelete(testimonial.id)}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                )}
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}
