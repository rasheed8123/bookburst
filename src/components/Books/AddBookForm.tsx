
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Book, booksAPI } from '@/services/api';
import { toast } from '@/components/ui/sonner';
// import { MultiSelect } from '@/components/ui/multi-select';
import { Checkbox } from "@/components/ui/checkbox";

const AddBookForm: React.FC<{
  onSuccess?: (book: Book) => void;
}> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    isbn: '',
    pageCount: '',
    publishedDate: '',
    publisher: '',
    genre: [] as Option[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Common genre options
  const genreOptions = [
    'Fiction', 'Non-fiction', 'Fantasy', 'Science Fiction', 
    'Mystery', 'Thriller', 'Romance', 'Biography', 
    'History', 'Self-Help', 'Business', 'Classics',
    'Young Adult', 'Children', 'Poetry', 'Drama'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pageCount' ? value.replace(/\D/g, '') : value
    }));
  };

  const handleGenreChange = (genre: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      genre: checked 
      ? [...prev.genre, genre] 
      : prev.genre.filter(g => g !== genre)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.author.trim()) {
      toast.error('Title and author are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const bookData = {
        ...formData,
        pageCount: formData.pageCount ? parseInt(formData.pageCount) : undefined,
        publishedDate: formData.publishedDate ? new Date(formData.publishedDate) : undefined
      };

      const newBook = await booksAPI.createBook(bookData);
      toast.success('Book added successfully');
      
      if (onSuccess) {
        onSuccess(newBook);
      }
      
      // Reset form
      setFormData({
        title: '',
        author: '',
        description: '',
        coverImage: '',
        isbn: '',
        pageCount: '',
        publishedDate: '',
        publisher: '',
        genre: []
      });
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error('Failed to add book');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book title"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="author">Author *</Label>
        <Input
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Book author"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Book description"
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
        
        <div>
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="ISBN number"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="pageCount">Page Count</Label>
          <Input
            id="pageCount"
            name="pageCount"
            value={formData.pageCount}
            onChange={handleChange}
            placeholder="Number of pages"
            type="text"
          />
        </div>
        
        <div>
          <Label htmlFor="publishedDate">Published Date</Label>
          <Input
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
            type="date"
          />
        </div>
        
        <div>
          <Label htmlFor="publisher">Publisher</Label>
          <Input
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Publisher name"
          />
        </div>
      </div>
      
      <div>
      <Label>Genres</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          {genreOptions.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox 
                id={`genre-${genre}`} 
                checked={formData.genre.includes(genre)} 
                onCheckedChange={(checked) => handleGenreChange(genre, checked === true)}
              />
              <Label 
                htmlFor={`genre-${genre}`}
                className="text-sm font-normal cursor-pointer"
              >
                {genre}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-bookburst-amber text-bookburst-navy hover:bg-bookburst-amber/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding Book...' : 'Add Book'}
      </Button>
    </form>
  );
};

export default AddBookForm;
