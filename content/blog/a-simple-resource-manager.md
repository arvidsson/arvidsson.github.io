---
title: A simple resource manager
date: 2023-08-23
tags:
  - unity
  - gamedev
  - c#
---

A simple way to dynamically load resources in Unity.

```csharp
using System.Collections.Generic;
using UnityEngine;

public class ResourceManager : MonoBehaviour
{
    public Dictionary<string, Sprite> Sprites { get; private set; } = new();
    public Dictionary<string, AudioClip> Sounds { get; private set; } = new();

    public void Load()
    {
        LoadSprites();
        LoadSounds();
    }

    private void LoadSprites()
    {
        var sprites = Resources.LoadAll<Sprite>("Sprites/");
        foreach (var sprite in sprites)
        {
            Sprites[sprite.name] = sprite;
        }
    }

    private void LoadSounds()
    {
        var sounds = Resources.LoadAll<AudioClip>("Sounds/");
        foreach (var sound in sounds)
        {
            Sounds[sound.name] = sound;
        }
    }
}
```
