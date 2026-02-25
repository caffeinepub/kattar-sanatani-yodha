import { useState, useMemo } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAllSubmissions, useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Download, X, Shield, LogIn } from 'lucide-react';
import type { Submission } from '../backend';

export default function Admin() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: submissions, isLoading: submissionsLoading, error } = useGetAllSubmissions();
  const [searchTerm, setSearchTerm] = useState('');

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  // Filter submissions based on search term
  const filteredSubmissions = useMemo(() => {
    if (!submissions) return [];
    if (!searchTerm.trim()) return submissions;

    const term = searchTerm.toLowerCase();
    return submissions.filter(
      (sub) =>
        sub.name.toLowerCase().includes(term) ||
        sub.email.toLowerCase().includes(term) ||
        sub.message.toLowerCase().includes(term)
    );
  }, [submissions, searchTerm]);

  // Format timestamp
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000); // Convert nanoseconds to milliseconds
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!filteredSubmissions.length) return;

    const headers = ['Timestamp', 'Name', 'Email', 'Message'];
    const rows = filteredSubmissions.map((sub) => [
      formatDate(sub.timestamp),
      sub.name,
      sub.email,
      sub.message.replace(/"/g, '""'), // Escape quotes
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `submissions_${today}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Show login prompt for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-warm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-display">Admin Access Required</CardTitle>
            <CardDescription>Please log in to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full bg-primary hover:bg-primary/90 shadow-warm"
              size="lg"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {isLoggingIn ? 'Logging in...' : 'Login with Internet Identity'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading state while checking admin status
  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4 md:p-8">
        <div className="container mx-auto max-w-7xl">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  // Show access denied for non-admin users
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-warm border-destructive/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-display text-destructive">Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to access the admin panel. Please contact the administrator if you believe
              this is an error.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Main admin panel
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-primary mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage contact form submissions</p>
        </div>

        {/* Controls */}
        <Card className="mb-6 shadow-warm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Export Button */}
              <Button
                onClick={exportToCSV}
                disabled={!filteredSubmissions.length}
                variant="outline"
                className="w-full md:w-auto shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {/* Filter indicator */}
            {searchTerm && (
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {filteredSubmissions.length} of {submissions?.length || 0} submissions
                </Badge>
                <span className="text-sm text-muted-foreground">matching your search</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Error state */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>Failed to load submissions. Please try again later.</AlertDescription>
          </Alert>
        )}

        {/* Loading state */}
        {submissionsLoading && (
          <Card className="shadow-warm">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submissions table */}
        {!submissionsLoading && submissions && (
          <Card className="shadow-warm overflow-hidden">
            <CardHeader>
              <CardTitle className="font-display">Form Submissions</CardTitle>
              <CardDescription>
                {submissions.length === 0
                  ? 'No submissions yet'
                  : `Total: ${submissions.length} submission${submissions.length === 1 ? '' : 's'}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {filteredSubmissions.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  {searchTerm ? 'No submissions match your search' : 'No submissions yet'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Timestamp</TableHead>
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                        <TableHead className="font-semibold">Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.map((submission) => (
                        <TableRow key={submission.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                            {formatDate(submission.timestamp)}
                          </TableCell>
                          <TableCell className="font-medium">{submission.name}</TableCell>
                          <TableCell>
                            <a
                              href={`mailto:${submission.email}`}
                              className="text-primary hover:underline transition-colors"
                            >
                              {submission.email}
                            </a>
                          </TableCell>
                          <TableCell className="max-w-md">
                            <div className="line-clamp-3 text-sm">{submission.message}</div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
