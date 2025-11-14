'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import OctopusLayout from '@/components/layout/OctopusLayout';

interface DraggableField {
  id: string;
  type: 'learnerName' | 'courseName' | 'completionDate' | 'instructorName' | 'companyName' | 'certificateId';
  label: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
}

export default function CreateCertificatePage() {
  const router = useRouter();
  const [step, setStep] = useState<'basic' | 'design'>('basic');
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Basic Info
  const [certificateName, setCertificateName] = useState('');
  const [description, setDescription] = useState('');
  const [linkedProduct, setLinkedProduct] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string>('');

  // Design & Layout
  const [fields, setFields] = useState<DraggableField[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const availableFields = [
    { type: 'learnerName' as const, label: 'Learner Name', icon: 'fa-user' },
    { type: 'courseName' as const, label: 'Course Name', icon: 'fa-book' },
    { type: 'completionDate' as const, label: 'Completion Date', icon: 'fa-calendar' },
    { type: 'instructorName' as const, label: 'Instructor Name', icon: 'fa-chalkboard-teacher' },
    { type: 'companyName' as const, label: 'Company Name', icon: 'fa-building' },
    { type: 'certificateId' as const, label: 'Certificate ID', icon: 'fa-hashtag' }
  ];

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const url = URL.createObjectURL(file);
      setPdfPreview(url);
    }
  };

  const handleDragStart = (fieldType: DraggableField['type'], label: string) => {
    // Create a new field instance each time a placeholder is clicked
    const newField: DraggableField = {
      id: `${fieldType}-${Date.now()}`,
      type: fieldType,
      label,
      x: 50, // Start at center
      y: 50,
      fontSize: 16,
      color: '#000000'
    };
    // Add to canvas without removing from sidebar
    setFields([...fields, newField]);
    setSelectedField(newField.id);
  };

  const handleFieldDrag = (fieldId: string, e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setFields(fields.map(f => 
      f.id === fieldId ? { ...f, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } : f
    ));
  };

  const updateFieldProperty = (fieldId: string, property: keyof DraggableField, value: any) => {
    setFields(fields.map(f => f.id === fieldId ? { ...f, [property]: value } : f));
  };

  const removeField = (fieldId: string) => {
    setFields(fields.filter(f => f.id !== fieldId));
    if (selectedField === fieldId) setSelectedField(null);
  };

  const handleSave = () => {
    // In real app, save to database
    console.log('Saving certificate:', {
      certificateName,
      description,
      linkedProduct,
      pdfFile,
      fields
    });
    router.push('/certificates');
  };

  return (
    <OctopusLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">Create Certificate Template</h1>
            <p className="text-gray-600">
              Step {step === 'basic' ? '1' : '2'} of 2 - {step === 'basic' ? 'Basic Info' : 'Design & Layout'}
            </p>
          </div>
          <button
            onClick={() => router.push('/certificates')}
            className="px-3.5 py-2 bg-gray-100 text-gray-900 rounded-md font-semibold hover:bg-gray-200:bg-gray-600 transition-all"
          >
            <i className="fas fa-times mr-2"></i>
            Cancel
          </button>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-md p-5 border border-gray-200">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step === 'basic' ? 'text-purple-600' : 'text-green-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step === 'basic' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-green-600 text-white'
              }`}>
                {step === 'basic' ? '1' : <i className="fas fa-check"></i>}
              </div>
              <span className="font-semibold">Basic Info</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${step === 'design' ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step === 'design' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className="font-semibold">Design & Layout</span>
            </div>
          </div>
        </div>

        {step === 'basic' ? (
          // Step 1: Basic Info
          <div className="bg-white rounded-md p-5 border border-gray-200 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Certificate Name *
              </label>
              <input
                type="text"
                value={certificateName}
                onChange={(e) => setCertificateName(e.target.value)}
                placeholder="e.g., Course Completion Certificate"
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe when this certificate is awarded"
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Link to Digital Product *
              </label>
              <select
                value={linkedProduct}
                onChange={(e) => setLinkedProduct(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 transition-all"
              >
                <option value="">Select a product</option>
                <option value="dp-001">Digital Marketing Masterclass</option>
                <option value="dp-002">Leadership Training Program</option>
                <option value="dp-003">AI & Machine Learning Workshop</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Upload Certificate Template (PDF) *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center hover:border-purple-500 transition-all">
                {pdfPreview ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 text-green-600">
                      <i className="fas fa-file-pdf text-4xl"></i>
                      <div className="text-left">
                        <p className="font-semibold">{pdfFile?.name}</p>
                        <p className="text-sm text-gray-600">
                          {(pdfFile?.size || 0 / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setPdfFile(null);
                        setPdfPreview('');
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      <i className="fas fa-trash mr-1"></i>
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-3"></i>
                    <p className="text-gray-600 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">PDF only (Max 10MB)</p>
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Upload a single-page PDF template. You'll position dynamic fields in the next step.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep('design')}
                disabled={!certificateName || !linkedProduct || !pdfFile}
                className="px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Design
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        ) : (
          // Step 2: Design & Layout
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Left: Available Fields */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-md p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Available Fields</h3>
                <p className="text-xs text-gray-600 mb-4">
                  Click to add fields to your certificate
                </p>
                <div className="space-y-2">
                  {availableFields.map((field) => (
                    <button
                      key={field.type}
                      onClick={() => handleDragStart(field.type, field.label)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-purple-50:bg-purple-900/20 hover:border-purple-300 transition-all text-left flex items-center gap-3"
                    >
                      <i className={`fas ${field.icon} text-purple-600`}></i>
                      <span className="text-sm font-medium text-gray-900">
                        {field.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Field Properties */}
              {selectedField && (
                <div className="bg-white rounded-md p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Field Properties</h3>
                  {(() => {
                    const field = fields.find(f => f.id === selectedField);
                    if (!field) return null;
                    return (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Font Size
                          </label>
                          <input
                            type="number"
                            value={field.fontSize}
                            onChange={(e) => updateFieldProperty(field.id, 'fontSize', parseInt(e.target.value))}
                            min="8"
                            max="72"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Color
                          </label>
                          <input
                            type="color"
                            value={field.color}
                            onChange={(e) => updateFieldProperty(field.id, 'color', e.target.value)}
                            className="w-full h-10 rounded-lg border border-gray-300"
                          />
                        </div>
                        <button
                          onClick={() => removeField(field.id)}
                          className="w-full px-3 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200:bg-red-900/50 transition-all"
                        >
                          <i className="fas fa-trash mr-2"></i>
                          Remove Field
                        </button>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Center: Canvas */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-md p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Certificate Preview</h3>
                  <div className="text-sm text-gray-600">
                    {fields.length} field{fields.length !== 1 ? 's' : ''} added
                  </div>
                </div>

                {/* Canvas */}
                <div
                  ref={canvasRef}
                  className="relative w-full aspect-[1.414/1] bg-gray-100 rounded-lg border-2 border-gray-300 overflow-hidden"
                  style={{
                    backgroundImage: pdfPreview ? `url(${pdfPreview})` : 'none',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {!pdfPreview && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <i className="fas fa-file-pdf text-6xl mb-4"></i>
                        <p>PDF Preview</p>
                      </div>
                    </div>
                  )}

                  {/* Draggable Fields */}
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      onClick={() => setSelectedField(field.id)}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        const onMouseMove = (moveEvent: MouseEvent) => {
                          handleFieldDrag(field.id, moveEvent as any);
                        };
                        const onMouseUp = () => {
                          document.removeEventListener('mousemove', onMouseMove);
                          document.removeEventListener('mouseup', onMouseUp);
                        };
                        document.addEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', onMouseUp);
                      }}
                      className={`absolute cursor-move px-3 py-1 rounded border-2 ${
                        selectedField === field.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-dashed border-gray-400 bg-white/80'
                      }`}
                      style={{
                        left: `${field.x}%`,
                        top: `${field.y}%`,
                        fontSize: `${field.fontSize}px`,
                        color: field.color,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {field.label}
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <i className="fas fa-info-circle mr-2"></i>
                    Click fields to add them to the certificate, then drag to position. Click a field to edit its properties.
                  </p>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setStep('basic')}
                    className="px-3.5 py-2 bg-gray-100 text-gray-900 rounded-md font-semibold hover:bg-gray-200:bg-gray-600 transition-all"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3.5 py-2 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
                  >
                    <i className="fas fa-save mr-2"></i>
                    Save Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </OctopusLayout>
  );
}
