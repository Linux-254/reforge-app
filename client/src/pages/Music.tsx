import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Music, ShieldCheck, Plus, Headphones } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function MusicPage() {
  const { user } = useAuth({
    redirectOnUnauthenticated: true,
    redirectPath: "/",
  });
  const [, setLocation] = useLocation();
  const [triggerGenres, setTriggerGenres] = useState("");
  const [triggerArtists, setTriggerArtists] = useState("");
  const [safeGenres, setSafeGenres] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistContext, setPlaylistContext] = useState("");

  const demoMode = import.meta.env.VITE_DEMO_MODE !== "false";
  const profileQuery = trpc.music.getProfile.useQuery(undefined, { enabled: !demoMode && Boolean(user) });
  const playlistsQuery = trpc.music.getPlaylists.useQuery(undefined, { enabled: !demoMode && Boolean(user) });
  const updateMutation = trpc.music.updateProfile.useMutation({
    onSuccess: () => toast.success("Profile saved"),
    onError: () => toast.error("Failed to save profile"),
  });
  const createPlaylistMutation = trpc.music.createPlaylist.useMutation({
    onSuccess: () => {
      toast.success("Playlist saved");
      setPlaylistTitle("");
      setPlaylistContext("");
      playlistsQuery.refetch();
    },
    onError: () => toast.error("Failed to save playlist"),
  });

  const profile = profileQuery.data;

  const handleSaveProfile = async () => {
    await updateMutation.mutateAsync({
      triggerGenres: triggerGenres || undefined,
      triggerArtists: triggerArtists || undefined,
      safeGenres: safeGenres || undefined,
    });
  };

  const handleCreatePlaylist = async () => {
    if (!playlistTitle.trim()) return;
    await createPlaylistMutation.mutateAsync({
      title: playlistTitle.trim(),
      context: playlistContext.trim() || undefined,
    });
  };

  if (profileQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100" aria-label="Loading music and sound settings">
        {/* Top bar skeleton */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
            <Skeleton className="h-9 w-20 rounded-md" />
            <div className="space-y-1">
              <Skeleton className="h-6 w-36 rounded-md" />
              <Skeleton className="h-4 w-64 rounded-sm" />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
          {/* Sound Map Card Skeleton */}
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-36 rounded-md" />
              <Skeleton className="h-4 w-full max-w-md rounded-sm" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-40 rounded-sm" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-40 rounded-sm" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <Skeleton className="h-10 w-32 rounded-md" />
            </CardContent>
          </Card>

          {/* Safe Playlists Section Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-5 w-32 rounded-md" />
                        <Skeleton className="h-3 w-20 rounded-sm" />
                      </div>
                    </div>
                    <Skeleton className="h-3 w-full rounded-sm" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-bold">Music & Sound</h1>
            <p className="text-sm text-slate-600">
              Rebuild your relationship with music, safely
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Profile */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
              Your Sound Map
            </CardTitle>
            <CardDescription>
              Name the genres and artists that trigger you, and the ones that
              help you stay grounded.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="trigger-genres">Trigger genres</Label>
              <Input
                id="trigger-genres"
                placeholder="e.g. trap, drill, phonk"
                defaultValue={profile?.triggerGenres ?? ""}
                onChange={e => setTriggerGenres(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="trigger-artists">Trigger artists</Label>
              <Input
                id="trigger-artists"
                placeholder="e.g. specific artists or bands"
                defaultValue={profile?.triggerArtists ?? ""}
                onChange={e => setTriggerArtists(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="safe-genres">Safe genres</Label>
              <Input
                id="safe-genres"
                placeholder="e.g. lofi, ambient, gospel"
                defaultValue={profile?.safeGenres ?? ""}
                onChange={e => setSafeGenres(e.target.value)}
                className="mt-2"
              />
            </div>
            <Button
              onClick={handleSaveProfile}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>

        {/* New Playlist */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-amber-600" />
              Save a Safe Playlist
            </CardTitle>
            <CardDescription>
              Keep a list of tracks or playlists that support you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="playlist-title">Title</Label>
              <Input
                id="playlist-title"
                placeholder="e.g. Sunday morning reset"
                value={playlistTitle}
                onChange={e => setPlaylistTitle(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="playlist-context">
                When to use it (optional)
              </Label>
              <Input
                id="playlist-context"
                placeholder="e.g. when I'm tempted, or on tough days"
                value={playlistContext}
                onChange={e => setPlaylistContext(e.target.value)}
                className="mt-2"
              />
            </div>
            <Button
              onClick={handleCreatePlaylist}
              disabled={
                !playlistTitle.trim() || createPlaylistMutation.isPending
              }
              className="gap-2"
            >
              <Headphones className="h-4 w-4" />
              {createPlaylistMutation.isPending ? "Saving..." : "Save Playlist"}
            </Button>
          </CardContent>
        </Card>

        {/* Playlists */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5 text-amber-600" />
              Your Safe Playlists
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!playlistsQuery.data || playlistsQuery.data.length === 0 ? (
              <p className="text-sm text-slate-600">
                No playlists yet. Save your first one above.
              </p>
            ) : (
              <div className="space-y-3">
                {playlistsQuery.data.map(pl => (
                  <div
                    key={pl.id}
                    className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{pl.title}</p>
                      {pl.context && (
                        <p className="text-sm text-slate-500">{pl.context}</p>
                      )}
                    </div>
                    <Music className="h-5 w-5 text-amber-500" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
