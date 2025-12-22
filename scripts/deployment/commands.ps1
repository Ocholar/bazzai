Get-ChildItem -Path C:\Antigravity -Filter package.json -Recurse | ForEach-Object {
  $p = $_.FullName
  $j = Get-Content -Raw -Path $p | ConvertFrom-Json
  "{0} -> {1} v{2}" -f $p, $j.name, $j.version
}
