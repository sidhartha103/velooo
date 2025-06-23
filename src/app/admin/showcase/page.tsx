'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useShowcase, type Reel } from '@/context/showcase-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Upload, Video, Image as ImageIcon } from 'lucide-react';

export default function ShowcaseManagementPage() {
    const { reels, addReel, deleteReel } = useShowcase();
    const [category, setCategory] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAddReel = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !category) {
            toast({
                variant: 'destructive',
                title: 'Missing fields',
                description: 'Please provide both a category and a file.',
            });
            return;
        }

        setIsUploading(true);
        
        const newReel: Omit<Reel, 'id'> = {
            src: URL.createObjectURL(file),
            category: category,
            isVideo: file.type.startsWith('video/'),
            hint: category.toLowerCase().split(' ').slice(0, 2).join(' '),
        };
        addReel(newReel);
        setCategory('');
        setFile(null);
        const fileInput = document.getElementById('file') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        
        toast({
            title: 'Success!',
            description: 'New showcase item added.',
        });
        setIsUploading(false);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Showcase Management</h1>
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Item</CardTitle>
                            <CardDescription>Upload a new image or video to the creator showcase.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleAddReel}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input 
                                        id="category" 
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)} 
                                        placeholder="e.g., Events & Weddings"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="file">Media File</Label>
                                    <Input 
                                        id="file" 
                                        type="file" 
                                        accept="image/*,video/*" 
                                        onChange={handleFileChange} 
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full" disabled={isUploading}>
                                    {isUploading ? 'Uploading...' : 'Add Item'}
                                    <Upload className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
                <div className="md:col-span-2">
                     <Card>
                        <CardHeader>
                            <CardTitle>Current Showcase</CardTitle>
                             <CardDescription>These items are currently live on your site.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {reels.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {reels.map(reel => (
                                        <Card key={reel.id} className="group relative overflow-hidden">
                                            <div className="aspect-[3/4] relative">
                                                {reel.isVideo ? (
                                                     <video src={reel.src} className="w-full h-full object-cover" loop muted autoPlay playsInline />
                                                ) : (
                                                    <Image
                                                        src={reel.src}
                                                        alt={reel.category}
                                                        fill
                                                        sizes="33vw"
                                                        className="object-cover"
                                                    />
                                                )}
                                                <div className="absolute top-2 right-2 flex items-center gap-2">
                                                     <div className="bg-black/50 p-1.5 rounded-full text-white">
                                                        {reel.isVideo ? <Video className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <p className="font-semibold truncate">{reel.category}</p>
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm"
                                                    className="w-full mt-2"
                                                    onClick={() => deleteReel(reel.id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">No showcase items yet. Add one to get started!</p>
                            )}
                        </CardContent>
                     </Card>
                </div>
            </div>
        </div>
    );
}
